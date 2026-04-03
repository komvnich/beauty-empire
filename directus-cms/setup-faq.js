const FAQ_ROWS = [
  {
    pl: {
      q: "Czy przedłużanie włosów niszczy włosy?",
      a: "Przy prawidłowym wykonaniu oraz regularnej korekcie przedłużanie włosów nie niszczy naturalnych włosów. W naszym salonie stosujemy delikatne metody oraz indywidualnie dobieramy kapsułki, dzięki czemu włosy pozostają w dobrej kondycji i mogą swobodnie rosnąć.",
    },
    ru: {
      q: "Повреждает ли наращивание волос?",
      a: "При правильном выполнении и регулярной коррекции наращивание не повреждает натуральные волосы. В салоне мы используем деликатные методы и индивидуально подбираем капсулы, чтобы волосы оставались здоровыми и могли расти.",
    },
    uk: {
      q: "Чи пошкоджує нарощення волосся?",
      a: "За правильного виконання та регулярної корекції нарощення не пошкоджує натуральне волосся. У салоні ми застосовуємо делікатні методи й індивідуально підбираємо капсули, тож волосся залишається в доброму стані й може рости.",
    },
    en: {
      q: "Does hair extension damage your hair?",
      a: "When performed correctly and maintained with regular correction, extensions do not damage natural hair. We use gentle methods and individually matched capsules so your hair stays healthy and can grow freely.",
    },
  },
  {
    pl: {
      q: "Ile utrzymuje się przedłużanie włosów?",
      a: "Efekt przedłużania włosów utrzymuje się zazwyczaj od 2,5 do 3 miesięcy. Po tym czasie zalecana jest korekta, aby zachować naturalny wygląd oraz komfort noszenia.",
    },
    ru: {
      q: "Сколько держится наращивание?",
      a: "Обычно эффект сохраняется 2,5–3 месяца. После этого рекомендуется коррекция для естественного вида и комфорта.",
    },
    uk: {
      q: "Скільки тримається нарощення?",
      a: "Зазвичай ефект зберігається 2,5–3 місяці. Після цього рекомендована корекція для природного вигляду й комфорту.",
    },
    en: {
      q: "How long do hair extensions last?",
      a: "Results typically last about 2.5 to 3 months. After that, a correction is recommended to keep a natural look and comfortable wear.",
    },
  },
  {
    pl: {
      q: "Czy kapsułki są widoczne?",
      a: "Nie. Stosujemy niewidoczne, ultra cienkie kapsułki, które są dopasowane do struktury włosów. Dzięki temu przedłużanie wygląda bardzo naturalnie, nawet przy wysokich upięciach.",
    },
    ru: {
      q: "Видны ли капсулы?",
      a: "Нет. Мы используем тонкие, едва заметные капсулы, подобранные под структуру волос — даже с высокими причёсками результат выглядит естественно.",
    },
    uk: {
      q: "Чи видно капсули?",
      a: "Ні. Ми використовуємо тонкі, майже непомітні капсули під структуру волосся — навіть із високими зачісками все виглядає природно.",
    },
    en: {
      q: "Are the capsules visible?",
      a: "No. We use ultra-thin, discreet capsules matched to your hair structure, so extensions look natural even in high updos.",
    },
  },
  {
    pl: {
      q: "Czy można robić kucyk i upięcia?",
      a: "Tak. Nasza metoda pozwala na noszenie wysokiego kucyka, koków oraz innych fryzur bez widocznych łączeń.",
    },
    ru: {
      q: "Можно ли делать хвост и укладки?",
      a: "Да. Наша техника позволяет высокий хвост, пучки и другие причёски без видимых соединений.",
    },
    uk: {
      q: "Чи можна робити хвіст і зачіски?",
      a: "Так. Наша методика дозволяє високий хвіст, пучки та інші укладки без видимих з’єднань.",
    },
    en: {
      q: "Can I wear a ponytail and updos?",
      a: "Yes. Our method supports high ponytails, buns, and other styles without visible bonds.",
    },
  },
  {
    pl: {
      q: "Ile trwa zabieg przedłużania włosów?",
      a: "Zabieg trwa zazwyczaj od 2 do 4 godzin, w zależności od ilości włosów oraz wybranego efektu.",
    },
    ru: {
      q: "Сколько длится процедура наращивания?",
      a: "Обычно 2–4 часа в зависимости от объёма волос и желаемого эффекта.",
    },
    uk: {
      q: "Скільки триває процедура нарощення?",
      a: "Зазвичай 2–4 години залежно від обсягу волосся та обраного ефекту.",
    },
    en: {
      q: "How long does the extension appointment take?",
      a: "Typically 2 to 4 hours, depending on hair volume and the desired result.",
    },
  },
  {
    pl: {
      q: "Ile kosztuje przedłużanie włosów w Warszawie?",
      a: "Cena zależy od długości włosów, ilości (gramatury) oraz efektu końcowego. Dlatego każda wycena jest indywidualna. Najlepiej umówić się na bezpłatną konsultację, aby poznać dokładny koszt.",
    },
    ru: {
      q: "Сколько стоит наращивание в Варшаве?",
      a: "Цена зависит от длины, граммовки и желаемого результата — расчёт индивидуальный. Запишитесь на бесплатную консультацию для точной стоимости.",
    },
    uk: {
      q: "Скільки коштує нарощення у Варшаві?",
      a: "Ціна залежить від довжини, грамажу та фінального ефекту — розрахунок індивідуальний. Краще записатися на безкоштовну консультацію для точної суми.",
    },
    en: {
      q: "How much do hair extensions cost in Warsaw?",
      a: "Price depends on length, grams, and the final look — every quote is individual. Book a free consultation for an exact cost.",
    },
  },
  {
    pl: {
      q: "Czy można farbować przedłużane włosy?",
      a: "Tak, jednak zalecamy wykonywanie koloryzacji w naszym salonie. Dzięki temu możemy dobrać odpowiednie produkty i zachować jakość włosów.",
    },
    ru: {
      q: "Можно ли красить наращенные волосы?",
      a: "Да, но мы рекомендуем окрашивание в нашем салоне — так мы подберём продукты и сохраним качество волос.",
    },
    uk: {
      q: "Чи можна фарбувати нарощене волосся?",
      a: "Так, але радимо фарбування в нашому салоні — так ми підберемо засоби й збережемо якість волосся.",
    },
    en: {
      q: "Can extended hair be colored?",
      a: "Yes, but we recommend coloring in our salon so we can choose the right products and protect hair quality.",
    },
  },
  {
    pl: {
      q: "Jak dbać o przedłużane włosy?",
      a: "Pielęgnacja jest kluczowa dla trwałości efektu. Każda klientka otrzymuje od nas dokładne wskazówki oraz indywidualnie dobraną pielęgnację domową. Możesz również pobrać nasz poradnik PDF z instrukcją pielęgnacji.",
    },
    ru: {
      q: "Как ухаживать за наращенными волосами?",
      a: "Уход важен для стойкости результата. Каждой клиентке мы даём чёткие рекомендации и подбор домашнего ухода. Также можно скачать наш PDF-гид по уходу.",
    },
    uk: {
      q: "Як доглядати за нарощеним волоссям?",
      a: "Догляд важливий для стійкості ефекту. Кожна клієнтка отримує чіткі рекомендації та підбір домашнього догляду. Також можна завантажити наш PDF-порадник.",
    },
    en: {
      q: "How do I care for my extensions?",
      a: "Aftercare is key to longevity. Every client gets clear guidance and a tailored home routine. You can also download our PDF care guide.",
    },
  },
  {
    pl: {
      q: "Czy przedłużane włosy są wygodne?",
      a: "Tak. Dzięki lekkim kapsułkom i odpowiedniemu rozłożeniu ciężaru włosy są komfortowe i praktycznie niewyczuwalne.",
    },
    ru: {
      q: "Удобно ли носить наращенные волосы?",
      a: "Да. Лёгкие капсулы и равномерное распределение делают носку комфортной, соединения почти не ощущаются.",
    },
    uk: {
      q: "Чи зручно носити нарощене волосся?",
      a: "Так. Легкі капсули та рівномірний розподіл ваги роблять носіння комфортним, з’єднання майже не відчуваються.",
    },
    en: {
      q: "Are extensions comfortable to wear?",
      a: "Yes. Lightweight capsules and even weight distribution make them comfortable and barely noticeable.",
    },
  },
  {
    pl: {
      q: "Czy można myć włosy normalnie?",
      a: "Tak. Włosy można myć normalnie, jednak ważne jest stosowanie odpowiednich produktów i techniki mycia.",
    },
    ru: {
      q: "Можно ли мыть волосы как обычно?",
      a: "Да, но важно использовать подходящие средства и правильную технику мытья.",
    },
    uk: {
      q: "Чи можна мити волосся як зазвичай?",
      a: "Так, але важливо використовувати відповідні засоби й правильну техніку миття.",
    },
    en: {
      q: "Can I wash my hair normally?",
      a: "Yes, with the right products and washing technique.",
    },
  },
  {
    pl: {
      q: "Czy przedłużanie włosów jest dla każdego?",
      a: "W większości przypadków tak. Podczas konsultacji oceniamy stan włosów i dobieramy najlepszą metodę, aby zabieg był bezpieczny i skuteczny.",
    },
    ru: {
      q: "Подходит ли наращивание всем?",
      a: "В большинстве случаев да. На консультации мы оцениваем состояние волос и подбираем безопасный и эффективный метод.",
    },
    uk: {
      q: "Чи підходить нарощення всім?",
      a: "У більшості випадків так. На консультації оцінюємо стан волосся й підбираємо безпечний і ефективний метод.",
    },
    en: {
      q: "Is hair extension suitable for everyone?",
      a: "In most cases, yes. At consultation we assess your hair and choose a safe, effective method.",
    },
  },
  {
    pl: {
      q: "Jak często trzeba robić korektę?",
      a: "Korekta wykonywana jest zazwyczaj co 2,5–3 miesiące, w zależności od tempa wzrostu włosów.",
    },
    ru: {
      q: "Как часто нужна коррекция?",
      a: "Обычно каждые 2,5–3 месяца в зависимости от скорости роста волос.",
    },
    uk: {
      q: "Як часто потрібна корекція?",
      a: "Зазвичай кожні 2,5–3 місяці залежно від швидкості росту волосся.",
    },
    en: {
      q: "How often do I need a correction?",
      a: "Typically every 2.5 to 3 months, depending on how fast your hair grows.",
    },
  },
  {
    pl: {
      q: "Czy można spać w przedłużanych włosach?",
      a: "Tak, jednak zalecamy związywanie włosów w luźny warkocz lub kucyk na noc.",
    },
    ru: {
      q: "Можно ли спать в наращенных волосах?",
      a: "Да, но на ночь лучше собрать волосы в свободную косу или низкий хвост.",
    },
    uk: {
      q: "Чи можна спати з нарощеним волоссям?",
      a: "Так, але на ніч краще зібрати волосся в вільну косу або низький хвіст.",
    },
    en: {
      q: "Can I sleep with extensions?",
      a: "Yes — we recommend a loose braid or low ponytail at night.",
    },
  },
  {
    pl: {
      q: "Czy przedłużane włosy się plączą?",
      a: "Nie, jeśli są odpowiednio pielęgnowane. Dlatego tak ważne jest stosowanie zaleconych kosmetyków i regularna pielęgnacja.",
    },
    ru: {
      q: "Путаются ли наращенные волосы?",
      a: "Нет при правильном уходе. Важно использовать рекомендованные средства и регулярный уход.",
    },
    uk: {
      q: "Чи плутається нарощене волосся?",
      a: "Ні, за належного догляду. Важливо використовувати рекомендовані засоби й регулярний догляд.",
    },
    en: {
      q: "Do extensions tangle?",
      a: "Not if cared for properly — use recommended products and a consistent routine.",
    },
  },
];

const HEADINGS = {
  pl: "Najczęściej zadawane pytania",
  ru: "Часто задаваемые вопросы",
  uk: "Найчастіші запитання",
  en: "Frequently asked questions",
};

async function main() {
  const base = "http://localhost:8055";
  const login = await fetch(`${base}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "admin@beauty-empire.com", password: "admin" }),
  });
  const loginJson = await login.json();
  const token = loginJson?.data?.access_token;
  if (!token) throw new Error("login failed");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const parse = async (response) => {
    const text = await response.text();
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  };

  const tryReq = async (method, path, body) => {
    const response = await fetch(`${base}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    if (response.ok) return true;
    const json = await parse(response);
    const raw = JSON.stringify(json);
    if (
      [400, 403, 404, 409].includes(response.status) ||
      raw.includes("already exists") ||
      raw.includes("duplicate") ||
      raw.includes("Duplicate")
    ) {
      return false;
    }
    throw new Error(`${method} ${path} ${response.status} ${raw}`);
  };

  const req = async (method, path, body) => {
    const response = await fetch(`${base}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await parse(response);
    if (!response.ok) throw new Error(`${method} ${path} ${response.status} ${JSON.stringify(json)}`);
    return json;
  };

  await tryReq("POST", "/collections", {
    collection: "faq_settings",
    meta: { singleton: true, icon: "quiz", display_template: "FAQ", note: "FAQ section heading", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "faq_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/faq_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });

  const settingsTransFields = [
    { field: "faq_settings_id", type: "integer", sort: 1, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "heading", type: "string", sort: 3, width: "full", ui: "input" },
  ];
  for (const f of settingsTransFields) {
    await tryReq("POST", "/fields/faq_settings_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, hidden: f.hidden || false, readonly: f.readonly || false },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "faq_settings_translations",
    field: "faq_settings_id",
    related_collection: "faq_settings",
    meta: {
      many_collection: "faq_settings_translations",
      many_field: "faq_settings_id",
      one_collection: "faq_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "faq_settings_translations",
      column: "faq_settings_id",
      foreign_key_table: "faq_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "faq_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "faq_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "faq_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "faq_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/collections", {
    collection: "faq_items",
    meta: { icon: "help", display_template: "{{sort}}", note: "FAQ questions" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "faq_items_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/faq_items", {
    field: "sort",
    type: "integer",
    meta: { interface: "input", sort: 1, width: "half" },
    schema: {},
  });
  await tryReq("POST", "/fields/faq_items", {
    field: "faq_settings_id",
    type: "integer",
    meta: { interface: "select-dropdown-m2o", sort: 2, width: "half" },
    schema: {},
  });
  await tryReq("POST", "/fields/faq_items", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 3, width: "full" },
  });

  const itemTransFields = [
    { field: "faq_items_id", type: "integer", sort: 1, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "question", type: "string", sort: 3, width: "full", ui: "input" },
    { field: "answer", type: "text", sort: 4, width: "full", ui: "input-multiline" },
  ];
  for (const f of itemTransFields) {
    await tryReq("POST", "/fields/faq_items_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, hidden: f.hidden || false, readonly: f.readonly || false },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "faq_items",
    field: "faq_settings_id",
    related_collection: "faq_settings",
    meta: {
      many_collection: "faq_items",
      many_field: "faq_settings_id",
      one_collection: "faq_settings",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "faq_items",
      column: "faq_settings_id",
      foreign_key_table: "faq_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/relations", {
    collection: "faq_items_translations",
    field: "faq_items_id",
    related_collection: "faq_items",
    meta: {
      many_collection: "faq_items_translations",
      many_field: "faq_items_id",
      one_collection: "faq_items",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "faq_items_translations",
      column: "faq_items_id",
      foreign_key_table: "faq_items",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "faq_items_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "faq_items_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "faq_items_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "faq_items_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  const policy = "abf8a154-5b1c-4a46-ac9c-7300570f4f17";
  for (const col of ["faq_settings", "faq_settings_translations", "faq_items", "faq_items_translations"]) {
    await tryReq("POST", "/permissions", {
      policy,
      collection: col,
      action: "read",
      permissions: {},
      fields: ["*"],
    });
  }

  await req("PATCH", "/items/faq_settings", {
    translations: [
      { languages_id: 1, heading: HEADINGS.pl },
      { languages_id: 2, heading: HEADINGS.ru },
      { languages_id: 3, heading: HEADINGS.en },
      { languages_id: 4, heading: HEADINGS.uk },
    ],
  });

  const settingsRes = await req("GET", "/items/faq_settings?fields=id");
  const settingsId = settingsRes?.data?.id ?? settingsRes?.data?.[0]?.id;
  if (!settingsId) throw new Error("faq_settings id missing");

  const existing = await req("GET", `/items/faq_items?filter[faq_settings_id][_eq]=${settingsId}&limit=1&fields=id`);
  const hasItems = Array.isArray(existing?.data) && existing.data.length > 0;

  if (!hasItems) {
    let sort = 1;
    for (const row of FAQ_ROWS) {
      await req("POST", "/items/faq_items", {
        faq_settings_id: settingsId,
        sort,
        translations: [
          { languages_id: 1, question: row.pl.q, answer: row.pl.a },
          { languages_id: 2, question: row.ru.q, answer: row.ru.a },
          { languages_id: 3, question: row.en.q, answer: row.en.a },
          { languages_id: 4, question: row.uk.q, answer: row.uk.a },
        ],
      });
      sort += 1;
    }
  }

  console.log("faq configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
