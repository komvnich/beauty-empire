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
    collection: "reviews_settings",
    meta: { singleton: true, icon: "star", display_template: "Reviews", note: "Localized reviews section", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "reviews_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/reviews_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });

  const fields = [
    { field: "reviews_settings_id", type: "integer", sort: 1, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, width: "full", ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "heading_before", type: "string", sort: 3, width: "third", ui: "input" },
    { field: "heading_highlight", type: "string", sort: 4, width: "third", ui: "input" },
    { field: "heading_after", type: "string", sort: 5, width: "third", ui: "input" },
    { field: "review_1_name", type: "string", sort: 6, width: "half", ui: "input" },
    { field: "review_1_comment", type: "text", sort: 7, width: "full", ui: "input-multiline" },
    { field: "review_1_rating", type: "integer", sort: 8, width: "half", ui: "input" },
    { field: "review_2_name", type: "string", sort: 9, width: "half", ui: "input" },
    { field: "review_2_comment", type: "text", sort: 10, width: "full", ui: "input-multiline" },
    { field: "review_2_rating", type: "integer", sort: 11, width: "half", ui: "input" },
    { field: "review_3_name", type: "string", sort: 12, width: "half", ui: "input" },
    { field: "review_3_comment", type: "text", sort: 13, width: "full", ui: "input-multiline" },
    { field: "review_3_rating", type: "integer", sort: 14, width: "half", ui: "input" },
  ];

  for (const f of fields) {
    await tryReq("POST", "/fields/reviews_settings_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, hidden: f.hidden || false, readonly: f.readonly || false, special: f.special || null },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "reviews_settings_translations",
    field: "reviews_settings_id",
    related_collection: "reviews_settings",
    meta: {
      many_collection: "reviews_settings_translations",
      many_field: "reviews_settings_id",
      one_collection: "reviews_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "reviews_settings_translations",
      column: "reviews_settings_id",
      foreign_key_table: "reviews_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "reviews_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "reviews_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "reviews_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "reviews_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "reviews_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "reviews_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  const pl = {
    languages_id: 1,
    heading_before: "Poznaj",
    heading_highlight: "opinie",
    heading_after: "naszych klientek",
    review_1_name: "Anna Kowalska",
    review_1_comment: "Najlepsze przedłużanie na jakim byłam! Metoda keratynowa jest kompletnie niewyczuwalna.",
    review_1_rating: 5,
    review_2_name: "Marta Wiśniewska",
    review_2_comment: "Włosy premium to naprawdę inna liga. Wyglądają jak moje własne. Polecam z całego serca!",
    review_2_rating: 5,
    review_3_name: "Katarzyna Nowak",
    review_3_comment: "Profesjonalizm na najwyższym poziomie. Efekt wow gwarantowany!",
    review_3_rating: 5,
  };

  const ru = {
    languages_id: 2,
    heading_before: "Узнайте",
    heading_highlight: "отзывы",
    heading_after: "наших клиенток",
    review_1_name: "Anna Kowalska",
    review_1_comment:
      "Лучшее наращивание, на котором я была! Кератиновый метод совершенно не ощущается.",
    review_1_rating: 5,
    review_2_name: "Marta Wiśniewska",
    review_2_comment:
      "Премиум-волосы — это другой уровень. Выглядят как натуральные. Рекомендую от всего сердца!",
    review_2_rating: 5,
    review_3_name: "Katarzyna Nowak",
    review_3_comment: "Профессионализм на высшем уровне. Эффект «вау» гарантирован!",
    review_3_rating: 5,
  };

  const uk = {
    languages_id: 4,
    heading_before: "Дізнайтеся",
    heading_highlight: "відгуки",
    heading_after: "наших клієнток",
    review_1_name: "Anna Kowalska",
    review_1_comment:
      "Найкраще нарощування, на якому я була! Кератиновий метод зовсім не відчувається.",
    review_1_rating: 5,
    review_2_name: "Marta Wiśniewska",
    review_2_comment:
      "Преміум-волосся — це зовсім інший рівень. Виглядають як мої власні. Рекомендую від усього серця!",
    review_2_rating: 5,
    review_3_name: "Katarzyna Nowak",
    review_3_comment: "Професіоналізм на найвищому рівні. Ефект «вау» гарантовано!",
    review_3_rating: 5,
  };

  const en = {
    languages_id: 3,
    heading_before: "Discover",
    heading_highlight: "reviews",
    heading_after: "from our clients",
    review_1_name: "Anna Kowalska",
    review_1_comment:
      "The best extensions I've ever had! The keratin method is completely undetectable.",
    review_1_rating: 5,
    review_2_name: "Marta Wiśniewska",
    review_2_comment:
      "Premium hair is truly another league. They look like my own. I recommend wholeheartedly!",
    review_2_rating: 5,
    review_3_name: "Katarzyna Nowak",
    review_3_comment: "Professionalism at the highest level. A wow effect guaranteed!",
    review_3_rating: 5,
  };

  await req("PATCH", "/items/reviews_settings", { translations: [pl, ru, uk, en] });
  console.log("reviews configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
