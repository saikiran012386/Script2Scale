/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@script2scale/ui",
    "@script2scale/types",
    "@script2scale/auth",
    "@script2scale/storage"
  ]
};

module.exports = nextConfig;
