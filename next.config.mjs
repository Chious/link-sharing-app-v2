/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      include: /node_modules/,
      use: "ignore-loader",
    });

    return config;
  },
};

export default nextConfig;
