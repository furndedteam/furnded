/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['robohash.org', 'firebasestorage.googleapis.com'],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(webm)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
