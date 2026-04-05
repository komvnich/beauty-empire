function assetRemotePatternFromEnvUrl(raw) {
  if (!raw?.trim()) return null;
  try {
    const u = new URL(raw.trim());
    const pattern = {
      protocol: u.protocol.replace(/:$/, ""),
      hostname: u.hostname,
      pathname: "/assets/**",
    };
    if (u.port) {
      pattern.port = u.port;
    }
    return pattern;
  } catch {
    return null;
  }
}

function buildDirectusImageRemotePatterns() {
  const apiDefault = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
  const assetsExplicit = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS_URL;
  const seen = new Set();
  const out = [];
  for (const raw of [apiDefault, assetsExplicit]) {
    const p = assetRemotePatternFromEnvUrl(raw);
    if (!p) continue;
    const key = JSON.stringify(p);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  if (out.length === 0) {
    out.push({
      protocol: "http",
      hostname: "localhost",
      port: "8055",
      pathname: "/assets/**",
    });
  }
  return out;
}

const directusImageRemotePatterns = buildDirectusImageRemotePatterns();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: directusImageRemotePatterns,
    unoptimized: true,
  },
};

export default nextConfig;
