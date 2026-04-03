const axios = require('axios');

async function fixPermissionsV2() {
  const url = 'http://localhost:8055';
  const loginRes = await axios.post(`${url}/auth/login`, { email: 'admin@beauty-empire.com', password: 'admin' });
  const token = loginRes.data.data.access_token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  try {
    const rolesRes = await axios.get(`${url}/roles`, config);
    // In some versions it's "Public", in others it might be null or have a specific ID
    const publicRole = rolesRes.data.data.find(r => r.name?.toLowerCase() === 'public')?.id || null;
    
    console.log('Public role ID found:', publicRole);

    const collections = [
      'navigation_settings', 
      'navigation_settings_translations', 
      'directus_languages',
      'directus_files'
    ];

    for (const collection of collections) {
      await axios.post(`${url}/permissions`, {
        role: publicRole, // Can be null for Public in some versions
        collection,
        action: 'read',
        fields: ['*']
      }, config).catch(() => console.log(`Permission for ${collection} already exists or failed.`));
    }

    console.log('DONE!');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}
fixPermissionsV2();
