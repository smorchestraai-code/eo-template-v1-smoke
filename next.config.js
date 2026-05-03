/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output produces a tiny self-contained server bundle in
  // .next/standalone — perfect for the multi-stage Dockerfile below.
  output: 'standalone',
};
module.exports = nextConfig;
