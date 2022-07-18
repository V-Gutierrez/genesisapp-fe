import Axios from 'services/axios'
import { UseQueryOptions } from 'react-query'

export const GET_ME = async () => Axios.get<Partial<User>>('/auth/me')
export const GET_GROWTH_GROUPS = async () => Axios.get<GrowthGroup[]>('/growthGroups')
export const GET_DEVOTIONALS = async () => Axios.get<Devotional[]>('/all-devotionals')
export const GET_USER_DEVOTIONALS = async () => Axios.get<Devotional[]>('/devotionals')
export const GET_DEVOTIONAL_BY_SLUG = async (
  ReactQueryParams: UseQueryOptions<unknown, unknown, unknown, (string | string[] | undefined)[]>,
) => {
  const { 1: devotionalSlug } = ReactQueryParams.queryKey as string[]

  if (devotionalSlug) {
    return Axios.get<Devotional>(`/devotionals/${devotionalSlug}`)
  }
}

export const GET_STATS = async () => Axios.get<Stats>('/stats')

export const REFRESH_TOKEN = async () => Axios.get('/auth')

export const GET_USERS = async () => Axios.get<User[]>('/users')

export const GET_GOOGLE_PHOTOS_ALBUM_PHOTOS = async (
  ReactQueryParams: UseQueryOptions<unknown, unknown, unknown, (string | string[] | undefined)[]>,
) => {
  const { 1: albumUrl } = ReactQueryParams.queryKey as string[]

  if (albumUrl) {
    return Axios.get<GooglePhotosImageSet[]>('/integrations/googlephotos', { params: { albumUrl } })
  }
}

export const GET_NEWS = async () => Axios.get<News[]>('/all-news')
export const GET_USER_NEWS = async () => Axios.get<News[]>('/news')
export const GET_NEWS_BY_SLUG = async (
  ReactQueryParams: UseQueryOptions<unknown, unknown, unknown, (string | string[] | undefined)[]>,
) => {
  const { 1: newsSlug } = ReactQueryParams.queryKey as string[]

  if (newsSlug) {
    return Axios.get<News>(`/news/${newsSlug}`)
  }
}
