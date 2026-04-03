const axios = require('axios');

async function syncAll() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in to Directus!');

    // 1. Fetch current navigation entry ID (singleton or not)
    const currentRes = await axios.get(`${url}/items/navigation_settings`, config);
    const navId = currentRes.data.data ? (Array.isArray(currentRes.data.data) ? currentRes.data.data[0]?.id : currentRes.data.data.id) : null;
    console.log('Current Navigation Entry ID:', navId || 'None');

    const plNav = [
      { label: "O nas", href: "#o-nas" },
      { label: "Metoda", href: "#metoda" },
      { label: "Usługi", href: "#nasze-usługi" },
      { label: "Efekty", href: "#efekty" },
      { label: "Cennik", href: "#cennik" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#kontakt" },
    ];

    const ruNav = [
      { label: "О нас", href: "#o-nas" },
      { label: "Метод", href: "#metoda" },
      { label: "Услуги", href: "#nasze-usługi" },
      { label: "Результаты", href: "#efekty" },
      { label: "Цены", href: "#cennik" },
      { label: "Частые вопросы", href: "#faq" },
      { label: "Контакты", href: "#kontakt" },
    ];

    const uaNav = [
      { label: "Про нас", href: "#o-nas" },
      { label: "Метод", href: "#metoda" },
      { label: "Послуги", href: "#nasze-usługi" },
      { label: "Результати", href: "#efekty" },
      { label: "Ціни", href: "#cennik" },
      { label: "Питання", href: "#faq" },
      { label: "Контакти", href: "#kontakt" },
    ];

    const enNav = [
      { label: "About", href: "#o-nas" },
      { label: "Method", href: "#metoda" },
      { label: "Services", href: "#nasze-usługi" },
      { label: "Results", href: "#efekty" },
      { label: "Pricing", href: "#cennik" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#kontakt" },
    ];

    const payload = {
      translations: [
        { languages_code: 'pl-PL', cta_label: 'Umów się', items: plNav },
        { languages_code: 'ru-RU', cta_label: 'Записаться', items: ruNav },
        { languages_code: 'uk-UA', cta_label: 'Записатися', items: uaNav },
        { languages_code: 'en-US', cta_label: 'Book now', items: enNav },
      ]
    };

    if (navId) {
      console.log('Updating existing entry...');
      await axios.patch(`${url}/items/navigation_settings/${navId}`, payload, config);
    } else {
      console.log('Creating new entry...');
      await axios.post(`${url}/items/navigation_settings`, payload, config);
    }

    console.log('✅ SYNC COMPLETE: Navigation populated for all languages.');
  } catch (err) {
    console.error('❌ ERROR:', err.response?.data || err.message);
  }
}

syncAll();
