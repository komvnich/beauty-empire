const axios = require('axios');

async function setupDirectus() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Create Navigation Table
    console.log('Setup navigation_settings...');
    await axios.post(`${url}/collections`, {
      collection: 'navigation_settings',
      singleton: true,
      schema: {},
      meta: { singleton: true, icon: 'menu' }
    }, config).catch(() => {});

    // 2. Create Translations Table
    await axios.post(`${url}/collections`, {
      collection: 'navigation_settings_translations',
      schema: {},
      meta: { hidden: true }
    }, config).catch(() => {});

    // 3. Add fields to translations
    const transFields = [
      { field: 'languages_code', type: 'string', meta: { interface: 'select-dropdown-language' } },
      { field: 'navigation_settings_id', type: 'integer' },
      { field: 'cta_label', type: 'string' },
      { field: 'items', type: 'json' }
    ];
    for (const f of transFields) {
      await axios.post(`${url}/fields/navigation_settings_translations`, f, config).catch(() => {});
    }

    // 4. IMPORTANT: Add the Alias field (Translations) TO THE PARENT
    console.log('Adding translations alias field...');
    await axios.post(`${url}/fields/navigation_settings`, {
      field: 'translations',
      type: 'alias',
      meta: {
        interface: 'translations',
        special: ['translations']
      }
    }, config).catch(() => {});

    // 5. Create Relation
    console.log('Creating relation...');
    await axios.post(`${url}/relations`, {
      collection: 'navigation_settings_translations',
      field: 'navigation_settings_id',
      related_collection: 'navigation_settings',
      meta: {
        one_field: 'translations'
      }
    }, config).catch(() => {});

    // 6. Permissions
    const publicRoleRes = await axios.get(`${url}/roles`, config);
    const publicRole = publicRoleRes.data.data.find(r => r.name === 'Public');
    if (publicRole) {
      const collections = ['navigation_settings', 'navigation_settings_translations'];
      for (const coll of collections) {
        await axios.post(`${url}/permissions`, { 
            role: publicRole.id, collection: coll, action: 'read', fields: ['*'] 
        }, config).catch(() => {});
      }
    }

    console.log('Directus is ready for manual content entry or automated patch!');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

setupDirectus();
