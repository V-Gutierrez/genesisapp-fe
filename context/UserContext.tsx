import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  useQuery,
} from 'react-query'
import { createContext, useContext, useMemo } from 'react'

import { AxiosResponse } from 'axios'
import { GET_ME } from 'services/queries'
import LoginModal from 'components/Login/LoginModal'
import { inHours } from 'helpers/time'
import { useDisclosure } from '@chakra-ui/react'

interface UserContextDefaultValues {
  userData: Partial<User>
  isAdmin: boolean
  // eslint-disable-next-line no-unused-vars
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>
  removeUserData: () => void
  openLoginModal: () => void
}

const UserContext = createContext({} as UserContextDefaultValues)

interface ProviderProps {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const {
    data,
    refetch: refetchUser,
    remove: removeUserData,
  } = useQuery('me', GET_ME, {
    retry: false,
    cacheTime: inHours(1),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const userData = useMemo(() => data?.data as Partial<User>, [data])
  const isAdmin = useMemo(() => data?.data.role === 'ADMIN', [data?.data.role])
  const providerValue = useMemo(
    () => ({ userData, isAdmin, openLoginModal: onOpen, refetchUser, removeUserData }),
    [userData, isAdmin, onOpen, refetchUser, removeUserData],
  )

  return (
    <UserContext.Provider value={providerValue}>
      {children}
      <LoginModal isOpen={isOpen} onClose={onClose} refetchUser={refetchUser} />
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
