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
    collection: "blog_settings",
    meta: { singleton: true, icon: "article", note: "Blog section settings", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "blog_settings_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });
  await tryReq("POST", "/fields/blog_settings", {
    field: "translations",
    type: "alias",
    meta: { special: ["translations"], interface: "translations", options: { languageField: "code" }, sort: 1, width: "full" },
  });

  const settingsFields = [
    { field: "blog_settings_id", type: "integer", sort: 1, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "heading_white", type: "string", sort: 3, ui: "input", width: "half" },
    { field: "heading_gold", type: "string", sort: 4, ui: "input", width: "half" },
    { field: "description", type: "text", sort: 5, ui: "input-multiline", width: "full" },
    { field: "read_more_label", type: "string", sort: 6, ui: "input", width: "half" },
  ];
  for (const f of settingsFields) {
    await tryReq("POST", "/fields/blog_settings_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width || "full", hidden: f.hidden || false, readonly: f.readonly || false },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "blog_settings_translations",
    field: "blog_settings_id",
    related_collection: "blog_settings",
    meta: {
      many_collection: "blog_settings_translations",
      many_field: "blog_settings_id",
      one_collection: "blog_settings",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_settings_translations",
      column: "blog_settings_id",
      foreign_key_table: "blog_settings",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "blog_settings_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "blog_settings_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "blog_settings_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_settings_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/collections", {
    collection: "blog_posts",
    meta: { icon: "feed", note: "Blog posts", collapse: "open" },
    schema: {},
  });
  await tryReq("POST", "/collections", {
    collection: "blog_posts_translations",
    meta: { hidden: true, icon: "import_export" },
    schema: {},
  });

  const postFields = [
    { field: "slug", type: "string", sort: 1, ui: "input", width: "half" },
    { field: "status", type: "string", sort: 2, ui: "select-dropdown", width: "half", options: { choices: [{ text: "published", value: "published" }, { text: "draft", value: "draft" }] } },
    { field: "published_at", type: "timestamp", sort: 3, ui: "datetime", width: "half" },
    { field: "cover_image", type: "uuid", sort: 4, ui: "file", width: "half", special: ["file"] },
    { field: "author_name", type: "string", sort: 5, ui: "input", width: "half" },
    { field: "reading_minutes", type: "integer", sort: 6, ui: "input", width: "half" },
    { field: "video_url", type: "string", sort: 7, ui: "input", width: "full" },
    { field: "translations", type: "alias", sort: 8, ui: "translations", width: "full", special: ["translations"], options: { languageField: "code" } },
  ];
  for (const f of postFields) {
    await tryReq("POST", "/fields/blog_posts", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width || "full", special: f.special || null, options: f.options || null },
      schema: {},
    });
  }

  const postTrFields = [
    { field: "blog_posts_id", type: "integer", sort: 1, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "languages_id", type: "integer", sort: 2, ui: "select-dropdown-m2o", hidden: true, readonly: true },
    { field: "title", type: "string", sort: 3, ui: "input", width: "full" },
    { field: "excerpt", type: "text", sort: 4, ui: "input-multiline", width: "full" },
    { field: "content_html", type: "text", sort: 5, ui: "input-rich-text-html", width: "full" },
    { field: "content_lexical", type: "json", sort: 6, ui: "input-rich-text-lexical", width: "full" },
  ];
  for (const f of postTrFields) {
    await tryReq("POST", "/fields/blog_posts_translations", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width || "full", hidden: f.hidden || false, readonly: f.readonly || false },
      schema: {},
    });
  }

  await tryReq("POST", "/relations", {
    collection: "blog_posts_translations",
    field: "blog_posts_id",
    related_collection: "blog_posts",
    meta: {
      many_collection: "blog_posts_translations",
      many_field: "blog_posts_id",
      one_collection: "blog_posts",
      one_field: "translations",
      junction_field: "languages_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_posts_translations",
      column: "blog_posts_id",
      foreign_key_table: "blog_posts",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "blog_posts_translations",
    field: "languages_id",
    related_collection: "languages",
    meta: {
      many_collection: "blog_posts_translations",
      many_field: "languages_id",
      one_collection: "languages",
      junction_field: "blog_posts_id",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_posts_translations",
      column: "languages_id",
      foreign_key_table: "languages",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });
  await tryReq("POST", "/relations", {
    collection: "blog_posts",
    field: "cover_image",
    related_collection: "directus_files",
    meta: {
      many_collection: "blog_posts",
      many_field: "cover_image",
      one_collection: "directus_files",
      one_deselect_action: "nullify",
    },
    schema: {
      table: "blog_posts",
      column: "cover_image",
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_update: "NO ACTION",
      on_delete: "SET NULL",
    },
  });

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "blog_settings",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "blog_settings_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "blog_posts",
    action: "read",
    permissions: { status: { _eq: "published" } },
    fields: ["*"],
  });
  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "blog_posts_translations",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  await req("PATCH", "/items/blog_settings", {
    translations: [
      { languages_id: 1, heading_white: "Poznaj nasze", heading_gold: "blogi", description: "Praktyczne poradniki, trendy i profesjonalne wskazówki dotyczące przedłużania oraz pielęgnacji włosów.", read_more_label: "Czytaj artykuł" },
      { languages_id: 2, heading_white: "Читайте наш", heading_gold: "блог", description: "Практичные гайды, тренды и рекомендации по наращиванию и уходу за волосами.", read_more_label: "Читать статью" },
      { languages_id: 4, heading_white: "Читайте наш", heading_gold: "блог", description: "Практичні гайди, тренди та рекомендації щодо нарощування і догляду за волоссям.", read_more_label: "Читати статтю" },
      { languages_id: 3, heading_white: "Explore our", heading_gold: "blog", description: "Practical guides, trends, and professional insights for hair extensions and care.", read_more_label: "Read article" },
    ],
  });

  const now = new Date().toISOString();
  const lexicalDoc = (title, body) => ({
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      children: [
        {
          type: "heading",
          tag: "h2",
          format: "",
          indent: 0,
          version: 1,
          children: [{ type: "text", text: title, detail: 0, format: 0, mode: "normal", style: "", version: 1 }]
        },
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          children: [{ type: "text", text: body, detail: 0, format: 0, mode: "normal", style: "", version: 1 }]
        }
      ]
    }
  });
  const postsSeed = [
    {
      slug: "pielegnacja-przedluzanych-wlosow",
      status: "published",
      published_at: now,
      author_name: "Natalia Krawczyk",
      reading_minutes: 12,
      video_url: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      translations: [
        { languages_id: 1, title: "Rytuał premium: pielęgnacja przedłużanych włosów krok po kroku", excerpt: "Kompletny protokół domowej pielęgnacji, który utrzymuje efekt salonowy i chroni łączenia keratynowe.", content_html: "<h2>Plan tygodnia</h2><p>Najlepsze efekty daje stały rytm: delikatne mycie, prawidłowe suszenie i kontrola końcówek.</p><p><a href='https://beauty-empire.example/care-protocol' target='_blank' rel='noopener noreferrer'>Pobierz checklistę pielęgnacji</a></p><h3>Zasady krytyczne</h3><ul><li>Nie śpij z mokrymi włosami</li><li>Nie nakładaj oleju na zgrzewy</li><li>Używaj termoochrony przed stylizacją</li><li>Korekta co 6-8 tygodni</li></ul>", content_lexical: lexicalDoc("Plan tygodnia", "Stały rytm pielęgnacji i regularna korekta gwarantują najdłuższą trwałość efektu.") },
        { languages_id: 2, title: "Премиум-уход за наращенными волосами: пошаговый протокол", excerpt: "Полный домашний протокол, который сохраняет салонный результат и защищает кератиновые крепления.", content_html: "<h2>Недельный план</h2><p>Лучший результат дает стабильный режим: мягкое мытье, правильная сушка и защита длины.</p><p><a href='https://beauty-empire.example/care-protocol' target='_blank' rel='noopener noreferrer'>Скачать чеклист ухода</a></p><h3>Ключевые правила</h3><ul><li>Не ложитесь спать с мокрыми волосами</li><li>Не наносите масла на крепления</li><li>Используйте термозащиту</li><li>Делайте коррекцию каждые 6-8 недель</li></ul>", content_lexical: lexicalDoc("Недельный план", "Стабильный режим ухода и своевременная коррекция дают максимальную стойкость результата.") },
        { languages_id: 4, title: "Преміум-догляд за нарощеним волоссям: покроковий протокол", excerpt: "Повний домашній протокол, що зберігає салонний результат і захищає кератинові кріплення.", content_html: "<h2>Тижневий план</h2><p>Найкращий ефект дає стабільний режим: м'яке миття, правильне сушіння та захист довжини.</p><p><a href='https://beauty-empire.example/care-protocol' target='_blank' rel='noopener noreferrer'>Завантажити чеклист догляду</a></p><h3>Ключові правила</h3><ul><li>Не лягайте спати з мокрим волоссям</li><li>Не наносьте олії на кріплення</li><li>Використовуйте термозахист</li><li>Робіть корекцію кожні 6-8 тижнів</li></ul>", content_lexical: lexicalDoc("Тижневий план", "Стабільний режим догляду і своєчасна корекція дають найкращу стійкість результату.") },
        { languages_id: 3, title: "Premium aftercare routine for hair extensions", excerpt: "A complete home-care protocol to preserve salon-quality results and protect keratin bonds.", content_html: "<h2>Weekly protocol</h2><p>The best outcome comes from consistency: gentle cleansing, proper drying, and length protection.</p><p><a href='https://beauty-empire.example/care-protocol' target='_blank' rel='noopener noreferrer'>Download aftercare checklist</a></p><h3>Critical rules</h3><ul><li>Never sleep with wet hair</li><li>Keep heavy oils away from bonds</li><li>Use heat protection before styling</li><li>Book correction every 6-8 weeks</li></ul>", content_lexical: lexicalDoc("Weekly protocol", "Consistent home care and scheduled correction ensure the longest-lasting premium result.") },
      ],
    },
    {
      slug: "konsultacja-przed-zabiegiem",
      status: "published",
      published_at: now,
      author_name: "Milena Wroblewska",
      reading_minutes: 9,
      video_url: "https://vimeo.com/76979871",
      translations: [
        { languages_id: 1, title: "Konsultacja 360: jak projektujemy Twoją metamorfozę", excerpt: "Transparentny proces decyzji: od analizy włosa po finalny plan długości, objętości i budżetu.", content_html: "<h2>Etap 1: diagnoza</h2><p>Sprawdzamy gęstość, elastyczność i historię koloryzacji.</p><h2>Etap 2: projekt efektu</h2><p>Dobieramy długość, objętość i strefy zagęszczenia.</p><blockquote>Dobrze wykonana konsultacja skraca czas usługi i podnosi jakość rezultatu.</blockquote><p><a href='https://beauty-empire.example/consultation' target='_blank' rel='noopener noreferrer'>Zobacz standard konsultacji</a></p>", content_lexical: lexicalDoc("Etap 1: diagnoza", "Dokładna diagnoza i projekt efektu to fundament bezpiecznej i przewidywalnej metamorfozy.") },
        { languages_id: 2, title: "Консультация 360: как мы проектируем вашу трансформацию", excerpt: "Прозрачный процесс: от диагностики волос до финального плана длины, объема и бюджета.", content_html: "<h2>Этап 1: диагностика</h2><p>Оцениваем плотность, эластичность и историю окрашиваний.</p><h2>Этап 2: проект результата</h2><p>Подбираем длину, объем и зоны уплотнения.</p><blockquote>Качественная консультация сокращает время услуги и повышает предсказуемость результата.</blockquote>", content_lexical: lexicalDoc("Этап 1: диагностика", "Подробная диагностика и дизайн результата — основа безопасной процедуры.") },
        { languages_id: 4, title: "Консультація 360: як ми проєктуємо вашу трансформацію", excerpt: "Прозорий процес: від діагностики волосся до фінального плану довжини, об'єму та бюджету.", content_html: "<h2>Етап 1: діагностика</h2><p>Оцінюємо щільність, еластичність і історію фарбувань.</p><h2>Етап 2: проєкт результату</h2><p>Підбираємо довжину, об'єм і зони ущільнення.</p><blockquote>Якісна консультація скорочує час послуги і підвищує передбачуваність результату.</blockquote>", content_lexical: lexicalDoc("Етап 1: діагностика", "Детальна діагностика і дизайн результату — основа безпечної процедури.") },
        { languages_id: 3, title: "Consultation 360: how we design your transformation", excerpt: "A transparent decision flow from hair diagnostics to a final plan for length, volume, and budget.", content_html: "<h2>Step 1: diagnostics</h2><p>We assess density, elasticity, and color history.</p><h2>Step 2: result design</h2><p>We define length, volume, and strategic placement zones.</p><blockquote>A strong consultation reduces service time and increases result predictability.</blockquote>", content_lexical: lexicalDoc("Step 1: diagnostics", "Detailed diagnostics and result planning are the foundation of a safe premium service.") },
      ],
    },
    {
      slug: "fakty-i-mity-o-przedluzaniu",
      status: "published",
      published_at: now,
      author_name: "Julia Czarnecka",
      reading_minutes: 11,
      video_url: "",
      translations: [
        { languages_id: 1, title: "Fakty vs mity: co naprawdę dzieje się po przedłużaniu włosów", excerpt: "Obalamy najczęstsze przekonania i pokazujemy fakty potwierdzone praktyką salonową.", content_html: "<h2>Mit 1: łączenia są zawsze widoczne</h2><p>Przy poprawnym doborze kapsułek łączenia pozostają dyskretne nawet przy cienkich włosach.</p><h2>Mit 2: nie da się spiąć włosów</h2><p>Nowoczesne rozmieszczenie pasm pozwala na kucyk i upięcia.</p><p><a href='https://beauty-empire.example/faqs' target='_blank' rel='noopener noreferrer'>Przeczytaj FAQ klientek</a></p>", content_lexical: lexicalDoc("Mit 1: łączenia są zawsze widoczne", "Przy właściwej metodzie i doborze pasm efekt pozostaje naturalny i dyskretny.") },
        { languages_id: 2, title: "Факты и мифы: что происходит после наращивания", excerpt: "Разбираем популярные заблуждения и даем факты, подтвержденные практикой салона.", content_html: "<h2>Миф 1: крепления всегда заметны</h2><p>При корректном подборе капсул крепления остаются незаметными.</p><h2>Миф 2: нельзя собирать волосы</h2><p>Современная схема распределения позволяет хвост и укладки.</p>", content_lexical: lexicalDoc("Миф 1: крепления всегда заметны", "При корректном подборе методики крепления остаются визуально деликатными.") },
        { languages_id: 4, title: "Факти та міфи: що відбувається після нарощення", excerpt: "Розбираємо поширені помилки і даємо факти, підтверджені салонною практикою.", content_html: "<h2>Міф 1: кріплення завжди видно</h2><p>За правильного підбору капсул кріплення залишаються непомітними.</p><h2>Міф 2: неможливо збирати волосся</h2><p>Сучасна схема розміщення дозволяє хвіст і укладки.</p>", content_lexical: lexicalDoc("Міф 1: кріплення завжди видно", "За правильного підбору методики кріплення залишаються делікатними і природними.") },
        { languages_id: 3, title: "Facts vs myths: what really happens after extensions", excerpt: "We break down common misconceptions and share salon-proven facts.", content_html: "<h2>Myth 1: bonds are always visible</h2><p>With correct bond size and placement, bonds remain discreet.</p><h2>Myth 2: you cannot wear ponytails</h2><p>Modern placement maps support ponytails and updos.</p>", content_lexical: lexicalDoc("Myth 1: bonds are always visible", "With proper technique and placement, premium extensions remain discreet and natural-looking.") },
      ],
    },
    {
      slug: "jak-dobrac-kolor-i-strukture",
      status: "published",
      published_at: now,
      author_name: "Olga Zielona",
      reading_minutes: 10,
      video_url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      translations: [
        { languages_id: 1, title: "Color match bez kompromisów: dobór odcienia i tekstury", excerpt: "Techniczny przewodnik dopasowania pasm tak, aby efekt wyglądał jak Twoje naturalne włosy.", content_html: "<h2>Odcień</h2><p>Pracujemy na miksie tonów: baza + światła + cienie, aby uniknąć płaskiego koloru.</p><h2>Tekstura</h2><p>Dobór falowania i grubości włosa jest kluczowy dla naturalnego ruchu fryzury.</p>", content_lexical: lexicalDoc("Odcień i tekstura", "Naturalny efekt powstaje wtedy, gdy kolor i ruch pasm są spójne z Twoimi włosami.") },
        { languages_id: 2, title: "Идеальный color match: подбор оттенка и текстуры", excerpt: "Технический гид по подбору прядей, чтобы результат выглядел как собственные волосы.", content_html: "<h2>Оттенок</h2><p>Мы используем микс тонов: база, блики и тени для глубины цвета.</p><h2>Текстура</h2><p>Совпадение по волне и плотности определяет естественность движения.</p>", content_lexical: lexicalDoc("Оттенок и текстура", "Натуральный результат получается при точном совпадении цвета и движения прядей.") },
        { languages_id: 4, title: "Ідеальний color match: підбір відтінку та текстури", excerpt: "Технічний гід з підбору пасм, щоб результат виглядав як власне волосся.", content_html: "<h2>Відтінок</h2><p>Використовуємо мікс тонів: база, відблиски та тіні для глибини кольору.</p><h2>Текстура</h2><p>Збіг хвилі та щільності визначає природний рух волосся.</p>", content_lexical: lexicalDoc("Відтінок і текстура", "Натуральний результат досягається при точному збігу кольору і руху пасм.") },
        { languages_id: 3, title: "Color match without compromise: shade and texture", excerpt: "A technical guide to selecting extension strands that look and move like your own hair.", content_html: "<h2>Shade architecture</h2><p>We build color depth with a mix of base, highlights, and lowlights.</p><h2>Texture alignment</h2><p>Wave pattern and density must match to keep natural movement.</p>", content_lexical: lexicalDoc("Shade and texture", "The most believable result comes from aligning color depth and strand movement.") },
      ],
    },
    {
      slug: "najczestsze-bledy-w-pielegnacji",
      status: "published",
      published_at: now,
      author_name: "Dominika Lewandowska",
      reading_minutes: 13,
      video_url: "",
      translations: [
        { languages_id: 1, title: "7 błędów, które skracają trwałość przedłużania", excerpt: "Praktyczna lista najczęstszych pomyłek po zabiegu i konkretne rozwiązania krok po kroku.", content_html: "<h2>Najczęstsze błędy</h2><ol><li>Spanie z mokrymi włosami</li><li>Codzienna wysoka temperatura bez ochrony</li><li>Maska przy łączeniach</li><li>Zbyt rzadka korekta</li></ol><h3>Jak to naprawić</h3><p>Wprowadź prosty plan: mycie 2-3 razy w tygodniu, termoochrona, szczotkowanie sekcjami i regularne wizyty.</p>", content_lexical: lexicalDoc("Najczęstsze błędy", "Największy wpływ na trwałość mają codzienne nawyki i terminowa korekta.") },
        { languages_id: 2, title: "7 ошибок, которые сокращают срок носки наращивания", excerpt: "Практичный список частых ошибок после процедуры и понятные шаги по исправлению.", content_html: "<h2>Типичные ошибки</h2><ol><li>Сон с мокрыми волосами</li><li>Высокая температура без защиты</li><li>Маска на крепления</li><li>Редкая коррекция</li></ol><h3>Как исправить</h3><p>Используйте простой режим: мягкое мытье, термозащита, послойное расчесывание и регулярные визиты.</p>", content_lexical: lexicalDoc("Типичные ошибки", "Срок носки определяется не только качеством работы, но и ежедневным уходом.") },
        { languages_id: 4, title: "7 помилок, що скорочують термін носіння нарощення", excerpt: "Практичний список частих помилок після процедури та зрозумілі кроки виправлення.", content_html: "<h2>Типові помилки</h2><ol><li>Сон з мокрим волоссям</li><li>Висока температура без захисту</li><li>Маска на кріплення</li><li>Рідка корекція</li></ol><h3>Як виправити</h3><p>Використовуйте простий режим: м'яке миття, термозахист, поетапне розчісування та регулярні візити.</p>", content_lexical: lexicalDoc("Типові помилки", "Тривалість носіння залежить від щоденних звичок і своєчасної корекції.") },
        { languages_id: 3, title: "7 mistakes that reduce extension longevity", excerpt: "A practical list of frequent aftercare mistakes and clear steps to fix them.", content_html: "<h2>Most frequent mistakes</h2><ol><li>Sleeping with wet hair</li><li>High heat without protection</li><li>Applying mask on bonds</li><li>Delayed correction appointments</li></ol><h3>How to fix</h3><p>Adopt a simple routine: gentle wash cycle, heat protectant, section brushing, and regular maintenance visits.</p>", content_lexical: lexicalDoc("Most frequent mistakes", "Long-term wear depends on daily routine quality and timely correction visits.") },
      ],
    },
  ];

  for (const post of postsSeed) {
    const existing = await req("GET", `/items/blog_posts?fields=id,slug&filter[slug][_eq]=${encodeURIComponent(post.slug)}`);
    const existingId = existing?.data?.[0]?.id;
    if (existingId) {
      await req("PATCH", `/items/blog_posts/${existingId}`, post);
    } else {
      await req("POST", "/items/blog_posts", post);
    }
  }

  console.log("blog configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
