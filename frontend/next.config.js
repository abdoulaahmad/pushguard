/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable Turbopack for development
  serverExternalPackages: ['@pushprotocol/restapi'],
  // Handle static exports if needed
  output: 'standalone',
  // Environment variables (if needed)
  env: {
    // Add any environment variables here
  },
  // Image optimization configuration
  images: {
    domains: [],
  },
};

module.exports = nextConfig;