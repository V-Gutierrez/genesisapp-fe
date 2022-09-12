import Axios from 'services/axios'

export const GET_13TH_ANNIVERSARY_SUBSCRIBERS = async () =>
  Axios.get<Pick<User, 'id' | 'name'>[]>('/resources/anniversaryEventSubscribers', {
    baseURL: '/api',
  })
