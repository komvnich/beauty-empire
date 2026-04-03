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
    collection: "site_contact",
    meta: {
      singleton: true,
      icon: "contact_mail",
      display_template: "Site contact",
      note: "Address, phone, email, social links (footer + contact block)",
      collapse: "open",
    },
    schema: {},
  });

  const fields = [
    { field: "address", type: "string", sort: 1, width: "full", ui: "input" },
    { field: "maps_url", type: "string", sort: 2, width: "full", ui: "input" },
    { field: "phone_display", type: "string", sort: 3, width: "half", ui: "input" },
    { field: "phone_href", type: "string", sort: 4, width: "half", ui: "input" },
    { field: "email", type: "string", sort: 5, width: "half", ui: "input" },
    { field: "email_href", type: "string", sort: 6, width: "half", ui: "input" },
    { field: "instagram_url", type: "string", sort: 7, width: "half", ui: "input" },
    { field: "facebook_url", type: "string", sort: 8, width: "half", ui: "input" },
  ];

  for (const f of fields) {
    await tryReq("POST", "/fields/site_contact", {
      field: f.field,
      type: f.type,
      meta: { interface: f.ui, sort: f.sort, width: f.width },
      schema: {},
    });
  }

  await tryReq("POST", "/permissions", {
    policy: "abf8a154-5b1c-4a46-ac9c-7300570f4f17",
    collection: "site_contact",
    action: "read",
    permissions: {},
    fields: ["*"],
  });

  await req("PATCH", "/items/site_contact", {
    address: "ul. Marszałkowska 55, Warszawa",
    maps_url: "https://maps.google.com/?q=ul.+Marszałkowska+55,+Warszawa",
    phone_display: "+48 555 123 456",
    phone_href: "tel:+48555123456",
    email: "kontakt@beautyempire.pl",
    email_href: "mailto:kontakt@beautyempire.pl",
    instagram_url: "https://instagram.com/beautyempire",
    facebook_url: "https://facebook.com/beautyempire",
  });

  console.log("site_contact configured");
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
