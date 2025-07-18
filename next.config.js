/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // for `next export` support with next/image
  },
   eslint: {
    ignoreDuringBuilds: true,
  },
};

