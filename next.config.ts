import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "Strict-Transport-Security",
          value: "max-age=31536000; includeSubDomains; preload",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "interest-cohort=()",
        },
      ],
    },
  ],
  env: {
    OPEN_WEATHER_API_KEY: "https://api.openweathermap.org",
    OPEN_WEATHER_URL: "5447924099058aa8aa05cebca3e30b56",
    OPEN_CAGE_URL: "https://api.opencagedata.com",
    OPEN_CAGE_API_KEY: "4942abef00524e67b696c3eece0776d0",
    IP_INFO_URL: "https://ipinfo.io",
    IP_INFO_KEY: "79baefc1e1557a",
  },
};

export default nextConfig;
