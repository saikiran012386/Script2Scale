/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@script2scale/ui",
    "@script2scale/types",
    "@script2scale/auth",
    "@script2scale/email",
    "@script2scale/analytics"
  ]
};

module.exports = nextConfig;
