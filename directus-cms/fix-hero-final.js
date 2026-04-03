const axios = require('axios');

async function debugAndFix() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // 1. Get ALL roles to find the correct one
    const rolesRes = await axios.get(`${url}/roles`, config);
    console.log('Available Roles:', rolesRes.data.data.map(r => r.name));
    
    // Public role in Directus 10.x+ sometimes has ID NULL or is a specific policy
    // We will just use the one named 'Public' (or whatever it is)
    const publicRole = rolesRes.data.data.find(r => r.name.toLowerCase() === 'public');
    const publicId = publicRole ? publicRole.id : null;
    console.log('Public Role ID:', publicId);

    // 2. Grant permissions
    const collections = ['hero_settings', 'hero_settings_translations'];
    for (const c of collections) {
      await axios.post(`${url}/permissions`, { 
        role: publicId, 
        collection: c, 
        action: 'read', 
        permissions: {}, 
        fields: ['*'] 
      }, config).catch(e => console.log(`${c} permission already exists or failed`));
    }

    // 3. Inject content
    const data = {
      translations: [
        {
          languages_id: 1, // pl
          pre_title: 'KOBIETA NOWEJ ERY',
          title_white: 'METAMORPHOSE',
          title_gold: 'SENSATION',
          description: 'ODKRYJ SWOJĄ UNIKALNĄ METAMORFOZĘ. AUTORSKA FORMUŁA PIELĘGNACJI TWARZY I CIAŁA, STWORZONA DLA TWOJEGO PIĘKNA.',
          cta_primary: 'Umów się',
          cta_secondary: 'Sprawdź cennik'
        },
        {
            languages_id: 2, // ru
            pre_title: 'ЖЕНЩИНА НОВОЙ ЭРЫ',
            title_white: 'METAMORPHOSE',
            title_gold: 'SENSATION',
            description: 'ОТКРОЙТЕ СВОЮ УНИКАЛЬНУЮ МЕТАМОРФОЗУ. АВТОРСКАЯ ФОРМУЛА УХОДА ЗА ЛИЦОМ И ТЕЛОМ, СОЗДАННАЯ ДЛЯ ВАШЕЙ КРАСОТЫ.',
            cta_primary: 'Записаться',
            cta_secondary: 'Узнать цены'
        }
      ]
    };

    console.log('Injecting content...');
    await axios.post(`${url}/items/hero_settings`, data, config).catch(e => {
        return axios.patch(`${url}/items/hero_settings`, data, config);
    });

    console.log('✅ FIXED AND INJECTED!');

  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

debugAndFix();
