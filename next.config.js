/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  importScripts: [
    `https://runtime.imagekit.io/0gr1w07bzr6iu/v1/js/network-based-adaption.js?v=${new Date().getTime()}`,
    'https://cdn.onesignal.com/sdks/OneSignalSDKWorker.js',
  ],

  disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io', 'lh3.googleusercontent.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
})
