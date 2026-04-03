const axios = require('axios');

async function syncFinalFinal() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

    // Define full translations with matching IDs from previous CURL
    const tData = [
      {
        id: 1, // English
        cta_label: 'Book now',
        items: [
          { label: "About", href: "#o-nas" },
          { label: "Method", href: "#metoda" },
          { label: "Services", href: "#nasze-usługi" },
          { label: "Results", href: "#efekty" },
          { label: "Pricing", href: "#cennik" },
          { label: "FAQ", href: "#faq" },
          { label: "Contact", href: "#kontakt" },
        ]
      },
      {
        id: 2, // Polish
        cta_label: 'Umów się',
        items: [
          { label: "O nas", href: "#o-nas" },
          { label: "Metoda", href: "#metoda" },
          { label: "Usługi", href: "#nasze-usługi" },
          { label: "Efekty", href: "#efekty" },
          { label: "Cennik", href: "#cennik" },
          { label: "FAQ", href: "#faq" },
          { label: "Kontakt", href: "#kontakt" },
        ]
      },
      {
        id: 3, // Russian
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
      }
    ];

    for (const item of tData) {
      console.log(`Updating translation ID ${item.id}...`);
      await axios.patch(`${url}/items/navigation_settings_translations/${item.id}`, item, config);
    }

    console.log('✅ ALL TRANSLATIONS UPDATED WITH 7 ITEMS EACH!');
  } catch (err) {
    console.error('❌ ERROR:', err.response?.data || err.message);
  }
}

syncFinalFinal();
