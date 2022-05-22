import {
  QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery,
} from 'react-query';
import { createContext, useContext, useMemo } from 'react';

import Axios from 'services/axios';
import { AxiosResponse } from 'axios';

interface UserContextDefaultValues {
  userData: Partial<User>;
  isAdmin: boolean;
  // eslint-disable no-unused-vars
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>;
  removeUserData: () => void;
}

const UserContext = createContext({} as UserContextDefaultValues);

interface ProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const {
    data,
    refetch: refetchUser,
    remove: removeUserData,
  } = useQuery('me', () => Axios.get<Partial<User>>('/auth/me'), {
    retry: false,
    cacheTime: 60 * 60 * 1000, // 1 hour,
  });

  const userData = useMemo(() => data?.data as Partial<User>, [data]);
  const isAdmin = useMemo(() => data?.data.role === 'ADMIN', [data?.data.role]);

  const providerValue = useMemo(() => ({ userData, isAdmin }), [userData, isAdmin]);

  return (
    <UserContext.Provider value={{ ...providerValue, refetchUser, removeUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
