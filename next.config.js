/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    importScripts: [`https://runtime.imagekit.io/0gr1w07bzr6iu/v1/js/network-based-adaption.js?v=${new Date().getTime()}`],
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
})
