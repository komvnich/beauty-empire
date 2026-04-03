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
    collection: "process_settings",
    meta: { singleton: true, icon: "checklist", display_template: "Process", note: "Localized process section", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "process_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/process_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });

  const baseFields = [
    { field: "process_settings_id", type: "integer", sort: 1, width: "full", hidden: true, readonly: true, ui: "select-dropdown-m2o" },
    { field: "languages_id", type: "integer", sort: 2, width: "full", hidden: true, readonly: true, ui: "select-dropdown-m2o" },
    { field: "heading_before", type: "string", sort: 3, width: "third", ui: "input" },
    { field: "heading_highlight", type: "string", sort: 4, width: "third", ui: "input" },
    { field: "heading_after", type: "string", sort: 5, width: "third", ui: "input" },
    { field: "cta_label", type: "string", sort: 6, width: "half", ui: "input" },
    { field: "image", type: "uuid", sort: 7, width: "half", ui: "file", special: ["file"] },
  ];

  for (const f of baseFields) {
    await tryReq("POST", "/fields/process_settings_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, hidden: f.hidden || false, readonly: f.readonly || false, special: f.special || null },
      schema: {},
    });
  }

  for (let i = 1; i <= 5; i++) {
    await tryReq("POST", "/fields/process_settings_translations", {
      field: `step_${i}_icon`,
      type: "string",
      meta: { interface: "input", sort: 7 + i * 3 - 2, width: "third" },
      schema: {},
    });
    await tryReq("POST", "/fields/process_settings_translations", {
      field: `step_${i}_title`,
      type: "string",
      meta: { interface: "input", sort: 7 + i * 3 - 1, width: "third" },
      schema: {},
    });
    await tryReq("POST", "/fields/process_settings_translations", {
      field: `step_${i}_description`,
      type: "text",
      meta: { interface: "input-multiline", sort: 7 + i * 3, width: "full" },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "process_settings_translations",
    field: "process_settings_id",
    related_collection: "process_settings",
    meta: {
      many_collection: "process_settings_translations",
      many_field: "process_settings_id",
      one_collection: "process_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "process_settings_translations",
      column: "process_settings_id",
      foreign_key_table: "process_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "process_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "process_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "process_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "process_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "process_settings_translations",
    field: "image",
    related_collection: "directus_files",
    meta: {
      many_collection: "process_settings_translations",
      many_field: "image",
      one_collection: "directus_files",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "process_settings_translations",
      column: "image",
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "process_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "process_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  const filesResp = await req("GET", "/files?fields=id&limit=10");
  const imageId = filesResp?.data?.[2]?.id || null;

  const pl = {
    languages_id: 1,
    heading_before: "Jak wygląda profesjonalne",
    heading_highlight: "przedłużanie",
    heading_after: "włosów?",
    cta_label: "Chcę efekt „wow”",
    image: imageId,
    step_1_icon: "01",
    step_1_title: "Konsultacja",
    step_1_description: "Analizujemy długość, gęstość i strukturę Twoich włosów, aby dobrać najlepszą metodę i idealny efekt.",
    step_2_icon: "02",
    step_2_title: "Indywidualny dobór włosów",
    step_2_description: "Dobieramy idealny kolor, długość i gramaturę włosów premium, które wyglądają jak Twoje naturalne.",
    step_3_icon: "03",
    step_3_title: "Przygotowanie włosów",
    step_3_description: "Oczyszczamy i przygotowujemy pasma, aby zapewnić trwałość i bezpieczeństwo przedłużania.",
    step_4_icon: "04",
    step_4_title: "Przedłużanie włosów",
    step_4_description: "Stylistka wykonuje zabieg autorską metodą keratynową - kapsułki są niewidoczne i ultra-małe.",
    step_5_icon: "05",
    step_5_title: "Metamorfoza",
    step_5_description: "Na koniec wykonujemy stylizację - cieszysz się gęstymi, długimi włosami bez efektu sztuczności.",
  };

  const ru = {
    ...pl,
    languages_id: 2,
    heading_before: "Как проходит профессиональное",
    heading_highlight: "наращивание",
    heading_after: "волос?",
    cta_label: "Хочу wow-эффект",
    step_1_title: "Консультация",
    step_1_description: "Анализируем длину, плотность и структуру волос, чтобы подобрать оптимальную методику и результат.",
    step_2_title: "Индивидуальный подбор волос",
    step_2_description: "Подбираем идеальный цвет, длину и плотность премиальных прядей для естественного вида.",
    step_3_title: "Подготовка волос",
    step_3_description: "Очищаем и подготавливаем волосы, чтобы обеспечить стойкость и безопасность процедуры.",
    step_4_title: "Наращивание волос",
    step_4_description: "Мастер выполняет процедуру авторской кератиновой методикой - капсулы миниатюрные и незаметные.",
    step_5_title: "Преображение",
    step_5_description: "Финальная укладка - и вы получаете густые, длинные волосы без искусственного эффекта.",
  };

  const uk = {
    ...pl,
    languages_id: 4,
    heading_before: "Як проходить професійне",
    heading_highlight: "нарощення",
    heading_after: "волосся?",
    cta_label: "Хочу wow-ефект",
    step_1_title: "Консультація",
    step_1_description: "Аналізуємо довжину, густоту та структуру волосся, щоб підібрати оптимальну методику і результат.",
    step_2_title: "Індивідуальний підбір волосся",
    step_2_description: "Підбираємо ідеальний колір, довжину та щільність преміальних пасом для природного вигляду.",
    step_3_title: "Підготовка волосся",
    step_3_description: "Очищаємо і готуємо волосся, щоб забезпечити стійкість і безпечність процедури.",
    step_4_title: "Нарощення волосся",
    step_4_description: "Майстер виконує процедуру авторською кератиновою методикою - капсули мініатюрні та непомітні.",
    step_5_title: "Перевтілення",
    step_5_description: "Фінальна укладка - і ви отримуєте густе, довге волосся без штучного ефекту.",
  };

  const en = {
    ...pl,
    languages_id: 3,
    heading_before: "How professional",
    heading_highlight: "hair extensions",
    heading_after: "work?",
    cta_label: "I want the wow effect",
    step_1_title: "Consultation",
    step_1_description: "We analyze your hair length, density, and structure to define the best method and desired result.",
    step_2_title: "Personalized hair matching",
    step_2_description: "We match ideal color, length, and density of premium hair so everything looks naturally seamless.",
    step_3_title: "Hair preparation",
    step_3_description: "We cleanse and prepare strands to ensure durability and safety of the extension process.",
    step_4_title: "Hair extension procedure",
    step_4_description: "The stylist applies our signature keratin method - bonds are invisible and ultra-small.",
    step_5_title: "Transformation",
    step_5_description: "Final styling completes the look - long, full hair without an artificial effect.",
  };

  await req("PATCH", "/items/process_settings", { translations: [pl, ru, uk, en] });
  console.log("process configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
