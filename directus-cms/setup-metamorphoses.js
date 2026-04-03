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
    collection: "metamorphoses_settings",
    meta: { singleton: true, icon: "compare", display_template: "Metamorphoses", note: "Localized before-after section", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "metamorphoses_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/metamorphoses_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });
  await tryReq("POST", "/fields/metamorphoses_settings_translations", {
    field: "metamorphoses_settings_id",
    type: "integer",
    meta: { hidden: true, readonly: true, interface: "select-dropdown-m2o", sort: 1 },
    schema: {},
  });
  await tryReq("POST", "/fields/metamorphoses_settings_translations", {
    field: "languages_id",
    type: "integer",
    meta: { hidden: true, readonly: true, interface: "select-dropdown-m2o", sort: 2 },
    schema: {},
  });

  const simpleFields = [
    { field: "badge_label", sort: 3, width: "full", type: "string", input: "input" },
    { field: "heading_white", sort: 4, width: "half", type: "string", input: "input" },
    { field: "heading_gold", sort: 5, width: "half", type: "string", input: "input" },
    { field: "description", sort: 6, width: "full", type: "text", input: "input-multiline" },
    { field: "cta_label", sort: 7, width: "full", type: "string", input: "input" },
    { field: "before_label", sort: 8, width: "third", type: "string", input: "input" },
    { field: "after_label", sort: 9, width: "third", type: "string", input: "input" },
    { field: "helper_label", sort: 10, width: "third", type: "string", input: "input" },
    { field: "case_label_prefix", sort: 11, width: "full", type: "string", input: "input" },
  ];
  for (const item of simpleFields) {
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: item.field,
      type: item.type,
      meta: { interface: item.input, sort: item.sort, width: item.width },
      schema: {},
    });
  }

  for (let i = 1; i <= 3; i++) {
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `case_${i}_title`,
      type: "string",
      meta: { interface: "input", sort: 12 + (i - 1) * 4, width: "half" },
      schema: {},
    });
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `case_${i}_summary`,
      type: "text",
      meta: { interface: "input-multiline", sort: 13 + (i - 1) * 4, width: "half" },
      schema: {},
    });
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `case_${i}_before_image`,
      type: "uuid",
      meta: { interface: "file", special: ["file"], sort: 14 + (i - 1) * 4, width: "half" },
      schema: {},
    });
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `case_${i}_after_image`,
      type: "uuid",
      meta: { interface: "file", special: ["file"], sort: 15 + (i - 1) * 4, width: "half" },
      schema: {},
    });
  }

  for (let i = 1; i <= 4; i++) {
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `achievement_${i}_title`,
      type: "string",
      meta: { interface: "input", sort: 24 + (i - 1) * 2, width: "half" },
      schema: {},
    });
    await tryReq("POST", "/fields/metamorphoses_settings_translations", {
      field: `achievement_${i}_description`,
      type: "text",
      meta: { interface: "input-multiline", sort: 25 + (i - 1) * 2, width: "half" },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "metamorphoses_settings_translations",
    field: "metamorphoses_settings_id",
    related_collection: "metamorphoses_settings",
    meta: {
      many_collection: "metamorphoses_settings_translations",
      many_field: "metamorphoses_settings_id",
      one_collection: "metamorphoses_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "metamorphoses_settings_translations",
      column: "metamorphoses_settings_id",
      foreign_key_table: "metamorphoses_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "metamorphoses_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "metamorphoses_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "metamorphoses_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "metamorphoses_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  for (let i = 1; i <= 3; i++) {
    await tryReq("POST", "/relations", {
      collection: "metamorphoses_settings_translations",
      field: `case_${i}_before_image`,
      related_collection: "directus_files",
      meta: {
        many_collection: "metamorphoses_settings_translations",
        many_field: `case_${i}_before_image`,
        one_collection: "directus_files",
        one_deselect_action: "nullify",
      },
      schema: {
        table: "metamorphoses_settings_translations",
        column: `case_${i}_before_image`,
        foreign_key_table: "directus_files",
        foreign_key_column: "id",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
    });
    await tryReq("POST", "/relations", {
      collection: "metamorphoses_settings_translations",
      field: `case_${i}_after_image`,
      related_collection: "directus_files",
      meta: {
        many_collection: "metamorphoses_settings_translations",
        many_field: `case_${i}_after_image`,
        one_collection: "directus_files",
        one_deselect_action: "nullify",
      },
      schema: {
        table: "metamorphoses_settings_translations",
        column: `case_${i}_after_image`,
        foreign_key_table: "directus_files",
        foreign_key_column: "id",
        on_update: "NO ACTION",
        on_delete: "SET NULL",
      },
    });
  }

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "metamorphoses_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "metamorphoses_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  const filesResp = await req("GET", "/files?fields=id,filename_download&limit=20");
  const files = filesResp.data || [];
  const idAt = (index) => files[index]?.id || null;

  const pl = {
    languages_id: 1,
    badge_label: "Twoja Metamorfoza",
    heading_white: "Zobacz magiczne",
    heading_gold: "efekty",
    description: "Używamy tylko najlepszych włosów premium, aby uzyskać efekt, który zachwyca, a jednocześnie jest całkowicie naturalny.",
    cta_label: "Chcę taką zmianę",
    before_label: "Przed",
    after_label: "Po",
    helper_label: "Przesuń, aby zobaczyć różnicę",
    case_label_prefix: "Przypadek",
    case_1_title: "Spektakularne przedłużenie i zagęszczenie",
    case_1_summary: "Każda metamorfoza to efekt wielogodzinnej, precyzyjnej pracy i idealnego dopasowania pasm.",
    case_1_before_image: idAt(1),
    case_1_after_image: idAt(0),
    case_2_title: "Naturalny efekt i idealny kolor",
    case_2_summary: "Precyzyjny dobór odcieni i długości daje harmonijny, naturalny rezultat.",
    case_2_before_image: idAt(2),
    case_2_after_image: idAt(3),
    case_3_title: "Metamorfoza włosów premium",
    case_3_summary: "Włosy premium i autorska technika zapewniają piękny efekt i komfort noszenia.",
    case_3_before_image: idAt(4),
    case_3_after_image: idAt(5),
    achievement_1_title: "Gęstość",
    achievement_1_description: "Spektakularne zagęszczenie rzadkich włosów",
    achievement_2_title: "Długość",
    achievement_2_description: "Natychmiastowy efekt długich pasm",
    achievement_3_title: "Kolor",
    achievement_3_description: "Perfekcyjne stapianie się odcieni",
    achievement_4_title: "Komfort",
    achievement_4_description: "Niewyczuwalne mikrokapsułki",
  };

  const ru = {
    ...pl,
    languages_id: 2,
    badge_label: "Ваша метаморфоза",
    heading_white: "Посмотрите магические",
    heading_gold: "результаты",
    description: "Мы используем только премиальные волосы, чтобы получить результат, который впечатляет и выглядит естественно.",
    cta_label: "Хочу такой результат",
    before_label: "До",
    after_label: "После",
    helper_label: "Проведите, чтобы увидеть разницу",
    case_label_prefix: "Кейс",
    case_1_title: "Эффектное удлинение и густота",
    case_1_summary: "Каждое преображение - это часы точной работы и идеального подбора оттенка.",
    case_2_title: "Естественный результат и идеальный цвет",
    case_2_summary: "Точный колористический подбор дает гармоничный и натуральный результат.",
    case_3_title: "Премиальная трансформация волос",
    case_3_summary: "Премиальные волосы и авторская техника обеспечивают красоту и комфорт.",
    achievement_1_title: "Густота",
    achievement_1_description: "Выраженное увеличение объема",
    achievement_2_title: "Длина",
    achievement_2_description: "Мгновенный эффект длины",
    achievement_3_title: "Цвет",
    achievement_3_description: "Идеальное совпадение оттенков",
    achievement_4_title: "Комфорт",
    achievement_4_description: "Невесомые микрокапсулы",
  };

  const uk = {
    ...pl,
    languages_id: 4,
    badge_label: "Ваше перевтілення",
    heading_white: "Побачте магічні",
    heading_gold: "результати",
    description: "Ми використовуємо лише преміальне волосся, щоб досягти ефекту, який вражає і виглядає природно.",
    cta_label: "Хочу такий результат",
    before_label: "До",
    after_label: "Після",
    helper_label: "Проведіть, щоб побачити різницю",
    case_label_prefix: "Кейс",
    case_1_title: "Ефектне подовження і густота",
    case_1_summary: "Кожне перевтілення - це години точної роботи та ідеального підбору відтінку.",
    case_2_title: "Природний ефект і ідеальний колір",
    case_2_summary: "Точний підбір тону дає гармонійний і природний результат.",
    case_3_title: "Преміальне перевтілення волосся",
    case_3_summary: "Преміальне волосся та авторська техніка забезпечують красу і комфорт.",
    achievement_1_title: "Густота",
    achievement_1_description: "Помітне збільшення обєму",
    achievement_2_title: "Довжина",
    achievement_2_description: "Миттєвий ефект довжини",
    achievement_3_title: "Колір",
    achievement_3_description: "Ідеальне співпадіння відтінків",
    achievement_4_title: "Комфорт",
    achievement_4_description: "Легкі мікрокапсули",
  };

  const en = {
    ...pl,
    languages_id: 3,
    badge_label: "Your Transformation",
    heading_white: "See the magical",
    heading_gold: "results",
    description: "We use only premium hair to deliver a result that looks stunning and naturally seamless.",
    cta_label: "I want this result",
    before_label: "Before",
    after_label: "After",
    helper_label: "Drag to see the difference",
    case_label_prefix: "Case",
    case_1_title: "Spectacular extension and density",
    case_1_summary: "Each transformation is the result of precise work and perfect shade matching.",
    case_2_title: "Natural look and perfect color",
    case_2_summary: "Precise color and length matching creates a balanced premium finish.",
    case_3_title: "Premium hair transformation",
    case_3_summary: "Premium strands plus a signature technique for beauty and comfort.",
    achievement_1_title: "Density",
    achievement_1_description: "Visible volume increase",
    achievement_2_title: "Length",
    achievement_2_description: "Instant long-hair effect",
    achievement_3_title: "Color",
    achievement_3_description: "Seamless shade blending",
    achievement_4_title: "Comfort",
    achievement_4_description: "Feather-light micro bonds",
  };

  await req("PATCH", "/items/metamorphoses_settings", { translations: [pl, ru, uk, en] });
  console.log("metamorphoses configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
