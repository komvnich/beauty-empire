const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_URL || "http://localhost:8055";
const directusHostname = (() => {
  try {
    return new URL(directusUrl).hostname;
  } catch {
    return "localhost";
  }
})();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8055",
      },
      {
        protocol: "https",
        hostname: directusHostname,
      },
      {
        protocol: "http",
        hostname: directusHostname,
      },
    ],
    unoptimized: true, // For easier local work if needed, but Next.js will optimize committed images
  },
};

export default nextConfig;
