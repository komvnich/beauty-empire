const axios = require('axios');

async function patchData() {
  const url = 'http://localhost:8055';
  const loginRes = await axios.post(`${url}/auth/login`, { email: 'admin@beauty-empire.com', password: 'admin' });
  const token = loginRes.data.data.access_token;
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const data = {
    translations: [
      { languages_code: 'pl-PL', cta_label: 'Umów się', items: [{label:'O nas', href:'#o-nas'}, {label:'Metoda', href:'#metoda'}, {label:'Cennik', href:'#cennik'}] },
      { languages_code: 'ru-RU', cta_label: 'Записаться', items: [{label:'О нас', href:'#o-nas'}, {label:'Метод', href:'#metoda'}, {label:'Цены', href:'#cennik'}] },
      { languages_code: 'uk-UA', cta_label: 'Записатися', items: [{label:'Про нас', href:'#o-nas'}, {label:'Метод', href:'#metoda'}, {label:'Ціни', href:'#cennik'}] },
      { languages_code: 'en-US', cta_label: 'Book now', items: [{label:'About', href:'#o-nas'}, {label:'Method', href:'#metoda'}, {label:'Price', href:'#cennik'}] }
    ]
  };

  await axios.patch(`${url}/items/navigation_settings`, data, config);
  console.log('Data patched!');
}
patchData();
