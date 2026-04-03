const axios = require('axios');

async function forcePopulate() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Clear old navigation data
    console.log('Clearing old nav data...');
    await axios.delete(`${url}/items/navigation_settings`, config).catch(() => {});

    // 2. Insert fresh record (for singletons, Directus uses 1 as ID or PATCH)
    const navItems = [
      { label: "O nas", href: "#o-nas" },
      { label: "Metoda", href: "#metoda" },
      { label: "Usługi", href: "#nasze-usługi" },
      { label: "Efekty", href: "#efekty" },
      { label: "Cennik", href: "#cennik" },
      { label: "FAQ", href: "#faq" },
      { label: "Kontakt", href: "#kontakt" },
    ];

    const data = {
      // Directus ID 1 for solo record
      id: 1,
      translations: [
        {
          languages_code: 'pl-PL',
          cta_label: 'Umów się',
          items: navItems
        },
        {
          languages_code: 'ru-RU',
          cta_label: 'Записаться',
          items: [
            { label: "О нас", href: "#about" },
            { label: "Метод", href: "#method" },
            { label: "Услуги", href: "#services" },
            { label: "Галерея", href: "#gallery" },
            { label: "Цены", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "Контакты", href: "#contact" },
          ]
        },
        {
          languages_code: 'uk-UA',
          cta_label: 'Записатися',
          items: [
            { label: "Про нас", href: "#about" },
            { label: "Метод", href: "#method" },
            { label: "Послуги", href: "#services" },
            { label: "Галерея", href: "#gallery" },
            { label: "Ціни", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "Контакти", href: "#contact" },
          ]
        },
        {
          languages_code: 'en-US',
          cta_label: 'Book now',
          items: [
            { label: "About", href: "#about" },
            { label: "Method", href: "#method" },
            { label: "Services", href: "#services" },
            { label: "Results", href: "#gallery" },
            { label: "Pricing", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#contact" },
          ]
        }
      ]
    };

    console.log('Sending fresh data...');
    await axios.post(`${url}/items/navigation_settings`, data, config).catch(e => {
        // If POST fails because it exists, use PATCH
        console.log('POST failed, trying PATCH...');
        return axios.patch(`${url}/items/navigation_settings`, data, config);
    });

    console.log('SUCCESS! Everything is in place.');

  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

forcePopulate();
