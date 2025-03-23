/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Configure for GitHub Pages - adjust the basePath if your repo is not at the root
  // basePath: '/your-repo-name',
  images: {
    unoptimized: true,
  },
  // This ensures that static assets are served correctly on GitHub Pages
  assetPrefix: process.env.NODE_ENV === 'production' ? '.' : '',
};

export default nextConfig;

