import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com"], // Add the allowed domains here
  },
};
if (process.env.NODE_ENV === "development") {
  await setupDevPlatform();
}

export default nextConfig;
