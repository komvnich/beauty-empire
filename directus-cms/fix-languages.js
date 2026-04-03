const axios = require('axios');

async function fixLanguages() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Setup system languages
    console.log('Registering languages in system...');
    const languages = [
      { code: 'pl-PL', name: 'Polski' },
      { code: 'ru-RU', name: 'Русский' },
      { code: 'uk-UA', name: 'Українська' },
      { code: 'en-US', name: 'English' }
    ];

    for (const lang of languages) {
      await axios.post(`${url}/settings`, {}, config).catch(() => {}); // Ensure settings exist
      // We use system languages collection
      await axios.post(`${url}/languages`, lang, config).catch(() => {});
    }

    // 2. Update the field interface to use a specific language relation
    console.log('Updating translations field meta...');
    await axios.patch(`${url}/fields/navigation_settings/translations`, {
      meta: {
        interface: 'translations',
        special: ['translations'],
        options: {
            languageField: 'languages_code'
        }
      }
    }, config).catch(e => console.log('Error updating field:', e.response?.data || e.message));

    console.log('Languages registered. Check the UI now!');
  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

fixLanguages();
