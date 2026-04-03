const axios = require('axios');

async function fixAndPopulate() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // 1. Force add fields if UI says "empty form"
    console.log('Ensuring fields exist...');
    const fields = [
      { field: 'cta_label', type: 'string', meta: { interface: 'input', width: 'half' } },
      { 
        field: 'items', 
        type: 'json', 
        meta: { 
          interface: 'list', 
          options: { 
            fields: [
              { field: 'label', name: 'Label', type: 'string' },
              { field: 'href', name: 'Link', type: 'string' }
            ] 
          } 
        } 
      }
    ];

    for (const f of fields) {
      await axios.post(`${url}/fields/navigation_settings_translations`, f, config).catch(() => {});
    }

    // 2. Initial Data from Header.tsx
    const navItemsPL = [
        { label: "O nas", href: "#o-nas" },
        { label: "Metoda", href: "#metoda" },
        { label: "Usługi", href: "#nasze-usługi" },
        { label: "Efekty", href: "#efekty" },
        { label: "Cennik", href: "#cennik" },
        { label: "FAQ", href: "#faq" },
        { label: "Kontakt", href: "#kontakt" },
    ];

    const data = {
      translations: [
        {
          languages_code: 'pl-PL',
          cta_label: 'Umów się',
          items: navItemsPL
        },
        {
          languages_code: 'ru-RU',
          cta_label: 'Записаться',
          items: [
            { label: "О нас", href: "#o-nas" },
            { label: "Метод", href: "#metoda" },
            { label: "Услуги", href: "#nasze-usługi" },
            { label: "Результаты", href: "#efekty" },
            { label: "Цены", href: "#cennik" },
            { label: "FAQ", href: "#faq" },
            { label: "Контакты", href: "#kontakt" },
          ]
        },
        {
          languages_code: 'uk-UA',
          cta_label: 'Записатися',
          items: [
            { label: "Про нас", href: "#o-nas" },
            { label: "Метод", href: "#metoda" },
            { label: "Послуги", href: "#nasze-usługi" },
            { label: "Результати", href: "#efekty" },
            { label: "Ціни", href: "#cennik" },
            { label: "FAQ", href: "#faq" },
            { label: "Контакти", href: "#kontakt" },
          ]
        },
        {
          languages_code: 'en-US',
          cta_label: 'Book now',
          items: [
            { label: "About", href: "#o-nas" },
            { label: "Method", href: "#metoda" },
            { label: "Services", href: "#nasze-usługi" },
            { label: "Gallery", href: "#efekty" },
            { label: "Pricing", href: "#cennik" },
            { label: "FAQ", href: "#faq" },
            { label: "Contact", href: "#kontakt" },
          ]
        }
      ]
    };

    console.log('Patching data...');
    await axios.patch(`${url}/items/navigation_settings`, data, config);
    console.log('DONE! Refresh Directus.');

  } catch (err) {
    console.error('Error:', err.response?.data || err.message);
  }
}

fixAndPopulate();
