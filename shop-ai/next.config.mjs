/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "unsplash.it",
      "images.unsplash.com",
      "picsum.photos",
      "cdn.dummyjson.com", 
      "fakestoreapi.com",
      "i.dummyjson.com",
    ],
  },
};

export default nextConfig;
