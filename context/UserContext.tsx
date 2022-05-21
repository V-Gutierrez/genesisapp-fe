import { createContext, useContext, useMemo } from 'react';

import Axios from 'services/axios';
import { useQuery } from 'react-query';

interface UserContextDefaultValues {
  userData: Partial<User>;
  isAdmin: boolean;
}

const UserContext = createContext({} as UserContextDefaultValues);

interface ProviderProps {
  children: React.ReactNode;
}

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const { data } = useQuery('me', () => Axios.get<Partial<User>>('/auth/me'), {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
  const userData = useMemo(() => data?.data as Partial<User>, [data]);

  const isAdmin = useMemo(() => data?.data.role === 'ADMIN', [data?.data.role]);

  const providerValue = useMemo(() => ({ userData, isAdmin }), [userData, isAdmin]);

  return <UserContext.Provider value={providerValue}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
