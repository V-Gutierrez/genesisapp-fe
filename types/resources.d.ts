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

type UserRegion = 'AEP' | 'FEC'
type UserRole = 'ADMIN' | 'USER'
interface User {
  email: string
  id: string
  name: string
  phone: string
  role: UserRole
  birthdate: Date | string
  createdAt: Date | string
  active: boolean
  region: UserRegion
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
  news: number
  ongoingEvents: number
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

interface EventsSubscription {
  userEmail: string
  userName: string
  userPhone: string
  id: string
}
interface EventItem {
  id: string
  title: string
  description: string
  coverImage: string
  coverThumbnail: string
  assetId: string
  maxSlots: number
  subscriptionsScheduledTo: string
  subscriptionsDueDate: string
  eventDate: string
  createdAt: string
  _count: {
    EventsSubscriptions: number
  }
  EventsSubscriptions?: EventsSubscriptions[]
}

interface RegionCollectionItem {
  regionKey: UserRegion
  regionTitle: string
}
