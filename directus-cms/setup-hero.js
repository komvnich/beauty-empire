const axios = require('axios');

async function createHeroSchema() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Create Collection hero_settings
    console.log('Creating hero_settings collection...');
    await axios.post(`${url}/collections`, {
      collection: 'hero_settings',
      meta: { singleton: true, icon: 'star', display_template: 'Hero Section' },
      schema: {}
    }, config).catch(e => console.log('hero_settings already exists'));

    // 2. Create translations collection
    console.log('Creating hero_settings_translations collection...');
    await axios.post(`${url}/collections`, {
      collection: 'hero_settings_translations',
      meta: { hidden: true },
      schema: {}
    }, config).catch(e => console.log('hero_settings_translations already exists'));

    // 3. Add regular fields (images)
    const fields = [
      { collection: 'hero_settings', field: 'image_desktop', type: 'uuid', meta: { interface: 'file' }, schema: {} },
      { collection: 'hero_settings', field: 'image_mobile', type: 'uuid', meta: { interface: 'file' }, schema: {} },
      // The translations field itself
      { 
        collection: 'hero_settings', 
        field: 'translations', 
        type: 'alias', 
        meta: { interface: 'translations', special: ['translations'] } 
      }
    ];

    for (const f of fields) {
      await axios.post(`${url}/fields/${f.collection}`, f, config).catch(() => {});
    }

    // 4. Add translated fields
    const tFields = [
      { field: 'hero_settings_id', type: 'integer', schema: { foreign_key_column: 'id', foreign_key_table: 'hero_settings' } },
      { field: 'languages_id', type: 'integer', schema: { foreign_key_column: 'id', foreign_key_table: 'languages' } },
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

    // 5. Open Public Permissions
    console.log('Opening Public permissions...');
    const publicRoleRes = await axios.get(`${url}/roles`, config);
    const publicRole = publicRoleRes.data.data.find(r => r.name === 'Public') || { id: null };
    
    const permissions = [
      { collection: 'hero_settings', action: 'read', permissions: {}, fields: ['*'] },
      { collection: 'hero_settings_translations', action: 'read', permissions: {}, fields: ['*'] }
    ];

    for (const p of permissions) {
      await axios.post(`${url}/permissions`, { ...p, role: publicRole.id }, config).catch(() => {});
    }

    // 6. POPULATE INITIAL DATA
    const heroData = {
      translations: [
        {
          languages_id: 1, // pl
          pre_title: 'KOBIETA NOWEJ ERY',
          title_white: 'METAMORPHOSE',
          title_gold: 'SENSATION',
          description: 'ODKRYJ SWOJĄ UNIKALNĄ METAMORFOZĘ. AUTORSKA FORMULA PILEGNACJI TWARZY I CIALA, STWORZONA DLA TWOJEGO PIĘKNA.',
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

    await axios.post(`${url}/items/hero_settings`, heroData, config).catch(() => {
        return axios.patch(`${url}/items/hero_settings`, heroData, config);
    });

    console.log('✅ HERO SCHEMA AND CONTENT INSTALLED SUCCESSFULLY!');
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

createHeroSchema();
