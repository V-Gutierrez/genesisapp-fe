import {
  QueryObserverResult, RefetchOptions, RefetchQueryFilters, useQuery,
} from 'react-query';
import { createContext, useContext, useMemo } from 'react';

import Axios from 'services/axios';
import { AxiosResponse } from 'axios';
import LoginModal from 'components/Login/LoginModal';
import { inHours } from 'helpers/time';
import { useDisclosure } from '@chakra-ui/react';

interface UserContextDefaultValues {
  userData: Partial<User>;
  isAdmin: boolean;
  // eslint-disable-next-line no-unused-vars
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>;
  removeUserData: () => void;
  openLoginModal: () => void;
}

const UserContext = createContext({} as UserContextDefaultValues);

interface ProviderProps {
  children: React.ReactNode;
}

const Query = async () => Axios.get<Partial<User>>('/auth/me');

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const {
    data,
    refetch: refetchUser,
    remove: removeUserData,
  } = useQuery('me', Query, {
    retry: false,
    cacheTime: inHours(1),
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userData = useMemo(() => data?.data as Partial<User>, [data]);
  const isAdmin = useMemo(() => data?.data.role === 'ADMIN', [data?.data.role]);

  const providerValue = useMemo(
    () => ({ userData, isAdmin, openLoginModal: onOpen }),
    [userData, isAdmin, onOpen],
  );

  return (
    <UserContext.Provider value={{ ...providerValue, refetchUser, removeUserData }}>
      {children}
      <LoginModal isOpen={isOpen} onClose={onClose} refetchUser={refetchUser} />
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
