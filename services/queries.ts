import Axios from 'services/axios';

export const GET_ME = async () => Axios.get<Partial<User>>('/auth/me');
export const GET_GROWTH_GROUPS = async () => Axios.get<GrowthGroup[]>('/growthGroups');
export const GET_DEVOTIONALS = async () => Axios.get<Devotional[]>('/devotionals');
