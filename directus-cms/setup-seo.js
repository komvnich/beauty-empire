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
    collection: "seo_settings",
    meta: {
      singleton: true,
      icon: "search",
      display_template: "SEO",
      note: "Site URL, Twitter handle, per-locale meta / Open Graph for the landing page",
      collapse: "open",
    },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "seo_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  await tryReq("POST", "/fields/seo_settings", {
    field: "site_url",
    type: "string",
    meta: { interface: "input", sort: 1, width: "full", note: "Canonical base, e.g. https://example.com (no trailing slash)" },
    schema: {},
  });
  await tryReq("POST", "/fields/seo_settings", {
    field: "twitter_site",
    type: "string",
    meta: { interface: "input", sort: 2, width: "half", note: "Twitter/X handle without @" },
    schema: {},
  });
  await tryReq("POST", "/fields/seo_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 3, width: "full" },
  });

  const seoTrFields = [
    { field: "seo_settings_id", type: "integer", sort: 1, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "meta_title", type: "string", sort: 3, width: "full", ui: "input" },
    { field: "meta_description", type: "text", sort: 4, width: "full", ui: "input-multiline" },
    { field: "og_title", type: "string", sort: 5, width: "half", ui: "input" },
    { field: "og_description", type: "text", sort: 6, width: "half", ui: "input-multiline" },
    { field: "og_image", type: "uuid", sort: 7, width: "half", ui: "file", special: ["file"] },
    { field: "robots", type: "string", sort: 8, width: "half", ui: "input", note: "e.g. index,follow or noindex,nofollow" },
  ];
  for (const f of seoTrFields) {
    await tryReq("POST", "/fields/seo_settings_translations", {
      field: f.field,
      type: f.type,
      meta: {
        interface: f.ui,
        sort: f.sort,
        width: f.width,
        hidden: f.hidden || false,
        readonly: f.readonly || false,
        special: f.special || null,
        note: f.note || null,
      },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "seo_settings_translations",
    field: "seo_settings_id",
    related_collection: "seo_settings",
    meta: {
      many_collection: "seo_settings_translations",
      many_field: "seo_settings_id",
      one_collection: "seo_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "seo_settings_translations",
      column: "seo_settings_id",
      foreign_key_table: "seo_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "seo_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "seo_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "seo_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "seo_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "seo_settings_translations",
    field: "og_image",
    related_collection: "directus_files",
    meta: {
      many_collection: "seo_settings_translations",
      many_field: "og_image",
      one_collection: "directus_files",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "seo_settings_translations",
      column: "og_image",
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  const blogSeoFields = [
    { field: "meta_title", type: "string", sort: 7, width: "full", ui: "input" },
    { field: "meta_description", type: "text", sort: 8, width: "full", ui: "input-multiline" },
    { field: "og_title", type: "string", sort: 9, width: "half", ui: "input" },
    { field: "og_description", type: "text", sort: 10, width: "half", ui: "input-multiline" },
    { field: "seo_og_image", type: "uuid", sort: 11, width: "half", ui: "file", special: ["file"] },
  ];
  for (const f of blogSeoFields) {
    await tryReq("POST", "/fields/blog_posts_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width, special: f.special || null },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "blog_posts_translations",
    field: "seo_og_image",
    related_collection: "directus_files",
    meta: {
      many_collection: "blog_posts_translations",
      many_field: "seo_og_image",
      one_collection: "directus_files",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_posts_translations",
      column: "seo_og_image",
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  const policy = "abf8a154-5b1c-4a46-ac9c-7300570f4f17";
  await tryReq("POST", "/permissions", {
    policy,
    collection: "seo_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy,
    collection: "seo_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  const plTitle = "BEAUTY EMPIRE | Przedłużanie włosów Warszawa";
  const plDesc =
    "Ekskluzywne przedłużanie włosów w Warszawie. Metamorfozy, które odmienią Twoje życie. Zarezerwuj darmową konsultację.";
  const ruTitle = "BEAUTY EMPIRE | Наращивание волос Варшава";
  const ruDesc =
    "Премиальное наращивание волос в Варшаве. Метаморфозы, которые меняют ваш образ. Запишитесь на бесплатную консультацию.";
  const ukTitle = "BEAUTY EMPIRE | Нарощування волосся Варшава";
  const ukDesc =
    "Преміальне нарощування волосся у Варшаві. Метаморфози, що змінюють ваш образ. Запишіться на безкоштовну консультацію.";
  const enTitle = "BEAUTY EMPIRE | Hair extensions Warsaw";
  const enDesc =
    "Premium hair extensions in Warsaw. Transformations that elevate your look. Book a free consultation.";

  await req("PATCH", "/items/seo_settings", {
    site_url: "https://beautyempire.pl",
    twitter_site: "beautyempire",
    translations: [
      {
        languages_id: 1,
        meta_title: plTitle,
        meta_description: plDesc,
        og_title: plTitle,
        og_description: plDesc,
        og_image: null,
        robots: "index,follow",
      },
      {
        languages_id: 2,
        meta_title: ruTitle,
        meta_description: ruDesc,
        og_title: ruTitle,
        og_description: ruDesc,
        og_image: null,
        robots: "index,follow",
      },
      {
        languages_id: 3,
        meta_title: enTitle,
        meta_description: enDesc,
        og_title: enTitle,
        og_description: enDesc,
        og_image: null,
        robots: "index,follow",
      },
      {
        languages_id: 4,
        meta_title: ukTitle,
        meta_description: ukDesc,
        og_title: ukTitle,
        og_description: ukDesc,
        og_image: null,
        robots: "index,follow",
      },
    ],
  });

  console.log("seo configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
