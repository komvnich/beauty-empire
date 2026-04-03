const axios = require('axios');

async function fixFinal() {
  const url = 'http://localhost:8055';
  const loginRes = await axios.post(`${url}/auth/login`, { email: 'admin@beauty-empire.com', password: 'admin' });
  const token = loginRes.data.data.access_token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    // 1. In Directus 11, the translations collection MUST have a language relation field
    console.log('Clearing old faulty collections...');
    await axios.delete(`${url}/collections/navigation_settings`, config).catch(() => {});
    await axios.delete(`${url}/collections/navigation_settings_translations`, config).catch(() => {});

    // 2. Setup correct Languages FIRST
    console.log('Verifying System Languages...');
    const langs = ['pl-PL', 'ru-RU', 'uk-UA', 'en-US'];
    for (const code of langs) {
      await axios.post(`${url}/languages`, { code, name: code }, config).catch(() => {});
    }

    // 3. Re-create parent
    await axios.post(`${url}/collections`, {
      collection: 'navigation_settings',
      singleton: true,
      schema: {},
      meta: { singleton: true, icon: 'settings' }
    }, config);

    // 4. Re-create translations child
    await axios.post(`${url}/collections`, {
      collection: 'navigation_settings_translations',
      schema: {},
      meta: { hidden: true }
    }, config);

    // 5. Add language field to translations WITH FK to directus_languages
    await axios.post(`${url}/fields/navigation_settings_translations`, {
      field: 'languages_code',
      type: 'string',
      meta: { interface: 'select-dropdown-language' }
    }, config);

    await axios.post(`${url}/relations`, {
      collection: 'navigation_settings_translations',
      field: 'languages_code',
      related_collection: 'directus_languages',
      meta: { one_allowed: true }
    }, config).catch(() => {});

    // 6. Common fields
    await axios.post(`${url}/fields/navigation_settings_translations`, { field: 'navigation_settings_id', type: 'integer' }, config);
    await axios.post(`${url}/fields/navigation_settings_translations`, { field: 'cta_label', type: 'string' }, config);
    await axios.post(`${url}/fields/navigation_settings_translations`, { field: 'items', type: 'json' }, config);

    // 7. Add ALIAS to parent
    await axios.post(`${url}/fields/navigation_settings`, {
      field: 'translations',
      type: 'alias',
      meta: {
        interface: 'translations',
        special: ['translations']
      }
    }, config);

    // 8. Create Relation between parent and translations
    await axios.post(`${url}/relations`, {
      collection: 'navigation_settings_translations',
      field: 'navigation_settings_id',
      related_collection: 'navigation_settings',
      meta: { one_field: 'translations' }
    }, config);

    // 9. Set Public Permissions
    const roles = await axios.get(`${url}/roles`, config);
    const publicRole = roles.data.data.find(r => r.name === 'Public').id;
    const colls = ['navigation_settings', 'navigation_settings_translations', 'directus_languages', 'directus_files'];
    for (const c of colls) {
      await axios.post(`${url}/permissions`, { role: publicRole, collection: c, action: 'read', fields: ['*'] }, config).catch(() => {});
    }

    console.log('COMPLETELY REBUILT! Check UI now.');
  } catch (e) {
    console.error('FAIL:', e.response?.data || e.message);
  }
}
fixFinal();
