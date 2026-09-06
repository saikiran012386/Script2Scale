/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET || "script2scale_super_secret_auth_key_2026_jwt_signing",
    JWT_SECRET: process.env.JWT_SECRET || "script2scale_super_secret_auth_key_2026_jwt_signing"
  },
  transpilePackages: [
    "@script2scale/ui",
    "@script2scale/types",
    "@script2scale/auth",
    "@script2scale/database",
    "@script2scale/storage"
  ]
};

module.exports = nextConfig;
