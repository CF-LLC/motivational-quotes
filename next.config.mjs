/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Remove basePath and assetPrefix for local development
  // These will be added by the GitHub Actions workflow only for production
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
