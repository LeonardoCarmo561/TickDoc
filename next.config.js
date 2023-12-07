/** @type {import('next').NextConfig} */
if (process.env.NODE_ENV === 'development') {
  const dns = require("dns");
  dns.setDefaultResultOrder("ipv4first")

}

const nextConfig = {
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

module.exports = nextConfig
