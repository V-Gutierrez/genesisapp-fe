import Axios from 'services/axios'

/**
 * Functions related to user data
 */

/**
 * Get the current user's data
 * @returns {Promise<Partial<User>>} - Promise that resolves to the user's data
 */
export const GET_ME = async () => Axios.get<Partial<User>>('/auth/me')

/**
 * Get the growth groups
 * @returns {Promise<GrowthGroup[]>} - Promise that resolves to an array of growth groups
 */
export const GET_GROWTH_GROUPS = async () => Axios.get<GrowthGroup[]>('/growthGroups')

/**
 * Get the devotionals for admins
 * @returns {Promise<Devotional[]>} - Promise that resolves to an array of devotionals
 */
export const GET_ADMIN_DEVOTIONALS = async () => Axios.get<Devotional[]>('/admin/devotionals')

/**
 * Get the devotionals for a user
 * @returns {Promise<Devotional[]>} - Promise that resolves to an array of devotionals
 */
export const GET_USER_DEVOTIONALS = async () => Axios.get<Devotional[]>('/devotionals')

/**
 * Get a devotional by its slug
 * @param {RQParams} ReactQueryParams - React Query parameters
 * @returns {Promise<Devotional>} - Promise that resolves to the devotional
 */
export const GET_DEVOTIONAL_BY_SLUG = async (ReactQueryParams: RQParams) => {
  const { 1: devotionalSlug } = ReactQueryParams.queryKey as string[]

  if (devotionalSlug) {
    return Axios.get<Devotional>(`/devotionals/${devotionalSlug}`)
  }
}

/**
 * Get the app's statistics
 * @returns {Promise<Stats>} - Promise that resolves to the app's statistics
 */
export const GET_STATS = async () => Axios.get<Stats>('/stats')

/**
 * Refresh the user's token
 * @returns {Promise<any>} - Promise that resolves to the refreshed token
 */
export const REFRESH_TOKEN = async () => Axios.get('/auth')

/**
 * Get the app's users (for admins)
 * @returns {Promise<User[]>} - Promise that resolves to an array of users
 */
export const GET_USERS = async () => Axios.get<User[]>('/admin/users')

/**
 * Get the photos from a Google Photos album
 * @param {RQParams} ReactQueryParams - React Query parameters
 * @returns {Promise<GooglePhotosImageSet[]>} - Promise that resolves to an array of photos
 */
export const GET_GOOGLE_PHOTOS_ALBUM_PHOTOS = async (ReactQueryParams: RQParams) => {
  const { 1: albumUrl } = ReactQueryParams.queryKey as string[]

  if (albumUrl) {
    return Axios.get<GooglePhotosImageSet[]>('/integrations/googlephotos', { params: { albumUrl } })
  }
}

/**
 * Functions related to news data
 */

/**
 * Get the news for admins
 * @returns {Promise<News[]>} - Promise that resolves to an array of news
 */
export const GET_ADMIN_NEWS = async () => Axios.get<News[]>('/admin/news')

/**
 * Get the news for a user
 * @returns {Promise<News[]>} - Promise that resolves to an array of news
 */
export const GET_USER_NEWS = async () => Axios.get<News[]>('/news')

/**
 * Get a news item by its slug
 * @param {RQParams} ReactQueryParams - React Query parameters
 * @returns {Promise<News>} - Promise that resolves to the news item
 */
export const GET_NEWS_BY_SLUG = async (ReactQueryParams: RQParams) => {
  const { 1: newsSlug } = ReactQueryParams.queryKey as string[]

  if (newsSlug) {
    return Axios.get<News>(`/news/${newsSlug}`)
  }
}

/**
 * Functions related to event data
 */

/**
 * Get the events for a user
 * @returns {Promise<EventItem[]>} - Promise that resolves to an array of events
 */
export const GET_USER_EVENTS = async () => Axios.get<EventItem[]>('/events')

/**
 * Get an event by its ID
 * @param {RQParams} ReactQueryParams - React Query parameters
 * @returns {Promise<EventItem>} - Promise that resolves to the event
 */
export const GET_EVENTS_BY_ID = async (ReactQueryParams: RQParams) => {
  const { 1: eventId } = ReactQueryParams.queryKey as string[]

  if (eventId) {
    return Axios.get<EventItem>(`/events/${eventId}`)
  }
}

/**
 * Get the events for admins
 * @returns {Promise<EventItem[]>} - Promise that resolves to an array of events
 */
export const GET_ADMIN_EVENTS = async () => Axios.get<EventItem[]>('/admin/events')

/**
 * Functions related to region data
 */

/**
 * Get the regions
 * @returns {Promise<RegionCollectionItem[]>} - Promise that resolves to an array of regions
 */
export const GET_REGIONS = async () => Axios.get<RegionCollectionItem[]>('/regions')

export const GET_GALLERIES = async () => Axios.get<Gallery[]>('/galleries')

export const GET_GALLERY_BY_ID = async (ReactQueryParams: RQParams) => {
  const { 1: galleryId } = ReactQueryParams.queryKey as string[]

  if (galleryId) {
    return Axios.get<Gallery>(`/galleries/${galleryId}`)
  }
}