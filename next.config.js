/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SMTP_USER: 'support@furnded.com',
    SMTP_PASSWORD: 'furndedSupport'
  },
  images: {
    domains: ['robohash.org', 'firebasestorage.googleapis.com'],
  },
};

module.exports = nextConfig;
