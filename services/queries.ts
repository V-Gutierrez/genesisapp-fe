import Axios from 'services/axios';
import { UseQueryOptions } from 'react-query';

export const GET_ME = async () => Axios.get<Partial<User>>('/auth/me');
export const GET_GROWTH_GROUPS = async () => Axios.get<GrowthGroup[]>('/growthGroups');
export const GET_DEVOTIONALS = async () => Axios.get<Devotional[]>('/all-devotionals');
export const GET_USER_DEVOTIONALS = async () => Axios.get<Devotional[]>('/devotionals');
export const GET_DEVOTIONAL_BY_SLUG = async (
  ReactQueryParams: UseQueryOptions<unknown, unknown, unknown, (string | string[] | undefined)[]>,
) => {
  const { 2: devotionalSlug } = ReactQueryParams.queryKey as string[];

  return Axios.get<Devotional>(`/devotionals/${devotionalSlug}`);
};

export const GET_STATS = async () => Axios.get<Stats>('/stats');
