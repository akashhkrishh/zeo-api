/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.akashhkrishh.in',
        pathname: '/**',
      },
    ], // Add your external image domain here
  },
};

export default nextConfig;
