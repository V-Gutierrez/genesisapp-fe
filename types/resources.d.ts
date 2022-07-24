/* eslint-disable no-unused-vars */

interface GrowthGroup {
  id: string
  createdAt: string
  lat: number
  lng: number
  name: string
  whatsappLink: string
  addressInfo: string
  weekDay: string
  scheduledTime: string
  leadership: string[]
}

interface User {
  email: string
  id: string
  name: string
  phone: string
  role: 'ADMIN' | 'USER'
  birthdate: Date | string
  createdAt: Date | string
  active: boolean
}

interface Interactions {
  userId: string
  devotionalId: string
}
interface Devotional {
  id: string
  createdAt: string
  scheduledTo: string
  title: string
  body: string
  slug: string
  author: string
  coverImage: string
  coverThumbnail: string
  readingTimeInMinutes: number
  DevotionalLikes: Interactions[]
  DevotionalViews: Interactions[]
}

interface Stats {
  activeUsers: number
  devotionals: number
  growthGroups: number
}

interface GooglePhotosImageSet {
  albumAddDate: number
  height: number
  imageUpdateDate: number
  smartCropped: string
  highQuality: string
  thumbnail: string
  minimalThumbnail: string
  uid: string
  url: string
  width: number
}

interface News {
  id: string
  createdAt: string
  scheduledTo: string
  title: string
  body: string
  slug: string
  highlightText: string
  coverImage: string
  coverThumbnail: string
  NewsLikes: Interactions[]
  NewsViews: Interactions[]
}
