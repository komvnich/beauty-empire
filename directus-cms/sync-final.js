const axios = require('axios');

async function syncFinal() {
  const url = 'http://localhost:8055';
  const credentials = { email: 'admin@beauty-empire.com', password: 'admin' };

  try {
    const loginRes = await axios.post(`${url}/auth/login`, credentials);
    const token = loginRes.data.data.access_token;
    const config = { headers: { Authorization: `Bearer ${token}` } };
    console.log('Logged in!');

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
      { label: "FAQ", href: "#faq" },
      { label: "Контакты", href: "#kontakt" },
    ];

    const uaNav = [
      { label: "Про нас", href: "#o-nas" },
      { label: "Метод", href: "#metoda" },
      { label: "Послуги", href: "#nasze-usługi" },
      { label: "Результати", href: "#efekty" },
      { label: "Ціни", href: "#cennik" },
      { label: "FAQ", href: "#faq" },
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

    // UPDATED PAYLOAD: using the language IDs from current database mapping
    const payload = {
      translations: [
        { id: 1, languages_id: 3, cta_label: 'Book now', items: enNav },
        { id: 2, languages_id: 1, cta_label: 'Umów się', items: plNav },
        { id: 3, languages_id: 2, cta_label: 'Записаться', items: ruNav },
        { languages_id: 4, cta_label: 'Записатися', items: uaNav },
      ]
    };

    console.log('Pushing final translations to ID 1...');
    await axios.patch(`${url}/items/navigation_settings`, payload, config);

    console.log('✅ CONTENT UPDATED! All 7 items added for each language.');
  } catch (err) {
    console.error('❌ ERROR:', err.response?.data || err.message);
  }
}

syncFinal();
