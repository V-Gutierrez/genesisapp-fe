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
  views: number
  likes: number
  userLiked?: boolean
}

interface Stats {
  activeUsers: number
  devotionals: number
  growthGroups: number
}

interface ExternalEventSubscriptions {
  id: string
  name: string
  email: string
  phone: string
  createdAt: string
}

interface ExternalEvent {
  id: string
  createdAt: string
  scheduledTo: string
  title: string
  description: string
  lat: number
  lng: number
  addressInfo: string
  maxSubscriptions: number
  coverImage: string
  coverThumbnail: string
  subscriptions: ExternalEventSubscriptions[]
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
