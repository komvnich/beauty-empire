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
    collection: "education_settings",
    meta: { singleton: true, icon: "school", display_template: "Education", note: "Localized education section", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "education_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/education_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });

  const fields = [
    { field: "education_settings_id", type: "integer", sort: 1, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "heading_before", type: "string", sort: 3, width: "half", ui: "input" },
    { field: "heading_highlight", type: "string", sort: 4, width: "half", ui: "input" },
    { field: "intro_primary", type: "text", sort: 5, width: "full", ui: "input-multiline" },
    { field: "intro_secondary", type: "text", sort: 6, width: "full", ui: "input-multiline" },
    { field: "key_title", type: "string", sort: 7, width: "half", ui: "input" },
    { field: "key_description", type: "text", sort: 8, width: "half", ui: "input-multiline" },
    { field: "guide_button_label", type: "string", sort: 9, width: "half", ui: "input" },
    { field: "guide_file", type: "uuid", sort: 10, width: "half", ui: "file", special: ["file"] },
    { field: "warning_badge_label", type: "string", sort: 11, width: "half", ui: "input" },
    { field: "warning_text", type: "text", sort: 12, width: "half", ui: "input-multiline" },
    { field: "warning_point_1", type: "string", sort: 13, width: "third", ui: "input" },
    { field: "warning_point_2", type: "string", sort: 14, width: "third", ui: "input" },
    { field: "warning_point_3", type: "string", sort: 15, width: "third", ui: "input" },
    { field: "quote_text", type: "text", sort: 16, width: "full", ui: "input-multiline" },
  ];

  for (const f of fields) {
    await tryReq("POST", "/fields/education_settings_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, hidden: f.hidden || false, readonly: f.readonly || false, special: f.special || null },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "education_settings_translations",
    field: "education_settings_id",
    related_collection: "education_settings",
    meta: {
      many_collection: "education_settings_translations",
      many_field: "education_settings_id",
      one_collection: "education_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "education_settings_translations",
      column: "education_settings_id",
      foreign_key_table: "education_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "education_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "education_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "education_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "education_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "education_settings_translations",
    field: "guide_file",
    related_collection: "directus_files",
    meta: {
      many_collection: "education_settings_translations",
      many_field: "guide_file",
      one_collection: "directus_files",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "education_settings_translations",
      column: "guide_file",
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "education_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "education_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  const pl = {
    languages_id: 1,
    heading_before: "Czy przedłużanie włosów",
    heading_highlight: "niszczy włosy?",
    intro_primary: "Przy prawidłowym wykonaniu oraz regularnej korekcie przedłużanie włosów nie niszczy naturalnych włosów i pozwala im swobodnie rosnąć.",
    intro_secondary: "Nasze stylistki specjalizują się w bardzo delikatnym przedłużaniu, wykorzystując indywidualnie dobrane kapsułki, które są dopasowane do struktury i gęstości włosów.",
    key_title: "Klucz do pięknego efektu",
    key_description: "Dbamy nie tylko o sam zabieg, ale również o Twoje włosy po wyjściu z salonu. Każda klientka otrzymuje od nas dokładne wskazówki: jak prawidłowo nosić przedłużane włosy, jak je pielęgnować i jakich produktów używać.",
    guide_button_label: "Pobierz darmowy poradnik PDF",
    guide_file: null,
    warning_badge_label: "Bardzo ważne",
    warning_text: "Regularnie kontrolujemy stan przedłużania i przypominamy o odpowiednim terminie korekty.",
    warning_point_1: "włosy pozostają w dobrej kondycji",
    warning_point_2: "efekt wygląda naturalnie",
    warning_point_3: "noszenie jest komfortowe",
    quote_text: "„Przedłużanie włosów to zawsze współpraca stylisty i klientki. Tylko dzięki odpowiedniej pielęgnacji możemy uzyskać piękny, trwały i bezpieczny efekt.”",
  };

  const ru = {
    ...pl,
    languages_id: 2,
    heading_before: "Повреждает ли наращивание",
    heading_highlight: "волосы?",
    intro_primary: "При правильном выполнении и регулярной коррекции наращивание не повреждает натуральные волосы и позволяет им расти.",
    intro_secondary: "Наши стилисты работают деликатно, подбирая капсулы индивидуально под структуру и густоту ваших волос.",
    key_title: "Ключ к красивому результату",
    key_description: "Мы заботимся не только о процедуре, но и о волосах после салона. Каждая клиентка получает подробные рекомендации по уходу.",
    guide_button_label: "Скачать бесплатный PDF-гид",
    warning_badge_label: "Очень важно",
    warning_text: "Мы регулярно контролируем состояние наращивания и напоминаем о сроках коррекции.",
    warning_point_1: "волосы сохраняют хорошее состояние",
    warning_point_2: "результат выглядит естественно",
    warning_point_3: "ношение остается комфортным",
    quote_text: "«Наращивание волос — это всегда совместная работа стилиста и клиента. Только правильный уход дает красивый, стойкий и безопасный результат.»",
  };

  const uk = {
    ...pl,
    languages_id: 4,
    heading_before: "Чи пошкоджує нарощення",
    heading_highlight: "волосся?",
    intro_primary: "За правильного виконання і регулярної корекції нарощення не пошкоджує натуральне волосся і дає йому рости.",
    intro_secondary: "Наші стилісти працюють делікатно, індивідуально підбираючи капсули під структуру і густоту волосся.",
    key_title: "Ключ до красивого результату",
    key_description: "Ми дбаємо не лише про процедуру, а й про волосся після салону. Кожна клієнтка отримує детальні рекомендації з догляду.",
    guide_button_label: "Завантажити безкоштовний PDF-гід",
    warning_badge_label: "Дуже важливо",
    warning_text: "Ми регулярно контролюємо стан нарощення і нагадуємо про строки корекції.",
    warning_point_1: "волосся залишається у доброму стані",
    warning_point_2: "результат виглядає природно",
    warning_point_3: "носіння залишається комфортним",
    quote_text: "«Нарощення волосся — це завжди спільна робота стиліста та клієнтки. Лише правильний догляд дає красивий, стійкий і безпечний результат.»",
  };

  const en = {
    ...pl,
    languages_id: 3,
    heading_before: "Does hair extension",
    heading_highlight: "damage your hair?",
    intro_primary: "When done correctly and maintained with regular correction, hair extension does not damage natural hair and allows healthy growth.",
    intro_secondary: "Our stylists specialize in delicate methods with capsules matched individually to your hair structure and density.",
    key_title: "The key to a beautiful result",
    key_description: "We care not only about the treatment but also about your post-visit routine. Every client receives clear aftercare guidance.",
    guide_button_label: "Download free PDF guide",
    warning_badge_label: "Very important",
    warning_text: "We monitor extension condition regularly and remind you about the right correction date.",
    warning_point_1: "hair stays in good condition",
    warning_point_2: "result looks natural",
    warning_point_3: "wear remains comfortable",
    quote_text: "\"Hair extensions are always a collaboration between the stylist and the client. Proper aftercare is what makes the result beautiful, long-lasting, and safe.\"",
  };

  await req("PATCH", "/items/education_settings", { translations: [pl, ru, uk, en] });
  console.log("education configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
