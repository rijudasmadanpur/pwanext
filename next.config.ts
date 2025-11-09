// import type { NextConfig } from "next";

// /** @type {import('next').NextConfig} */
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
// });

// const nextConfig = {
//   reactStrictMode: true,
// };

// module.exports = withPWA(nextConfig);
/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  // 👇 Force use of webpack instead of turbopack
  experimental: {
    turbo: false,
  },
};

module.exports = withPWA(nextConfig);
