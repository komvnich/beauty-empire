const axios = require('axios');

async function recreateHeroClean() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Delete old collections to clear the mess
    console.log('Cleaning up existing collections...');
    await axios.delete(`${url}/collections/hero_settings_translations`, config).catch(() => {});
    await axios.delete(`${url}/collections/hero_settings`, config).catch(() => {});

    // 2. Create Hero Settings (Main)
    console.log('Creating hero_settings...');
    await axios.post(`${url}/collections`, {
      collection: 'hero_settings',
      meta: { singleton: true },
      schema: {}
    }, config);

    // 3. Create Hero Settings Translations
    console.log('Creating hero_settings_translations...');
    await axios.post(`${url}/collections`, {
      collection: 'hero_settings_translations',
      meta: { hidden: true },
      schema: {}
    }, config);

    // 4. Add fields to translations (CRITICAL ORDER)
    const tFields = [
      { field: 'hero_settings_id', type: 'integer', schema: { foreign_key_table: 'hero_settings' } },
      { field: 'languages_id', type: 'integer', schema: { foreign_key_table: 'languages' } },
      { field: 'pre_title', type: 'string' },
      { field: 'title_white', type: 'string' },
      { field: 'title_gold', type: 'string' },
      { field: 'description', type: 'text' },
      { field: 'cta_primary', type: 'string' },
      { field: 'cta_secondary', type: 'string' }
    ];

    for (const f of tFields) {
      await axios.post(`${url}/fields/hero_settings_translations`, f, config);
    }

    // 5. Add ALIAS field to main collection
    await axios.post(`${url}/fields/hero_settings`, {
        field: 'translations',
        type: 'alias',
        meta: { interface: 'translations', special: ['translations'] }
    }, config);

    // 6. POPULATE DATA
    const heroContent = {
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

    console.log('Pushing data...');
    await axios.post(`${url}/items/hero_settings`, heroContent, config);

    console.log('✅ RECREATION COMPLETE!');
  } catch (err) {
    console.error('ERROR:', err.response?.data || err.message);
  }
}

recreateHeroClean();
