/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === 'development') {
  const dns = require("dns");
  dns.setDefaultResultOrder("ipv4first")

}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**/*',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/**/*'
      }
    ]
  }
}

const withPWA = require('next-pwa')({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})

module.exports = withPWA(nextConfig)
