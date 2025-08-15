/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["dev-to-uploads.s3.amazonaws.com", "res.cloudinary.com"],
  },
};

module.exports = nextConfig;
