const axios = require('axios');

async function fixHeroSchema() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Ensure foreign keys exist
    console.log('Setting up relationships...');
    await axios.post(`${url}/fields/hero_settings_translations`, {
      field: 'hero_settings_id',
      type: 'integer',
      schema: { foreign_key_table: 'hero_settings' },
      meta: { interface: 'select-dropdown-m2o' }
    }, config).catch(() => console.log('Hero settings link ok'));

    await axios.post(`${url}/fields/hero_settings_translations`, {
      field: 'languages_id',
      type: 'integer',
      schema: { foreign_key_table: 'languages' },
      meta: { interface: 'select-dropdown-m2o' }
    }, config).catch(() => console.log('Language link ok'));

    // 2. Add text fields to translations
    const tFields = [
      { field: 'pre_title', type: 'string', meta: { interface: 'input' } },
      { field: 'title_white', type: 'string', meta: { interface: 'input' } },
      { field: 'title_gold', type: 'string', meta: { interface: 'input' } },
      { field: 'description', type: 'text', meta: { interface: 'textarea' } },
      { field: 'cta_primary', type: 'string', meta: { interface: 'input' } },
      { field: 'cta_secondary', type: 'string', meta: { interface: 'input' } },
    ];

    for (const f of tFields) {
      await axios.post(`${url}/fields/hero_settings_translations`, f, config).catch(() => {});
    }

    // 3. Add translation ALIAS to hero_settings
    await axios.post(`${url}/fields/hero_settings`, {
        field: 'translations',
        type: 'alias',
        meta: { interface: 'translations', special: ['translations'] }
    }, config).catch(() => {});

    // 4. Update Permissions
    console.log('Updating permissions...');
    const rolesRes = await axios.get(`${url}/roles`, config);
    const publicId = rolesRes.data.data.find(r => r.name === 'Public').id;

    await axios.post(`${url}/permissions`, { role: publicId, collection: 'hero_settings', action: 'read', fields: ['*'] }, config).catch(() => {});
    await axios.post(`${url}/permissions`, { role: publicId, collection: 'hero_settings_translations', action: 'read', fields: ['*'] }, config).catch(() => {});

    // 5. DATA INJECTION
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
    await axios.post(`${url}/items/hero_settings`, data, config).catch(() => {
        return axios.patch(`${url}/items/hero_settings`, data, config);
    });

    console.log('✅ DONE!');
  } catch (err) {
      console.error(err.response?.data || err.message);
  }
}

fixHeroSchema();
