interface LinkItemProps {
  name: string
  icon: IconType
  goTo: string
}

interface HeaderProps {
  onOpen: () => void
}

interface NavItemProps {
  icon: IconType
  goTo: string
  children: string
}

interface SidebarProps {
  onClose: () => void
}
interface CustomSliderProps<T> {
  children: ReactNode | ReactNode[]
  customSettings?: T
}

interface CoordsState {
  lat: number | null
  lng: number | null
}

interface GroupListProps {
  GCDataset: GrowthGroup[]
  selectCoordsHandler: (lat: number, lng: number) => void
  currentCoords: CoordsState
}

interface GroupCardProps {
  Group: GrowthGroup
  selectCoordsHandler: (lat: number, lng: number) => void
  active: boolean
}

interface MapFrameProps {
  GCDataset: GrowthGroup[]
  currentCoords: CoordsState
  selectCoordsHandler: (lat: number, lng: number) => void
}

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>
}

interface LoginFormProps {
  onClose: () => void
  visibilityHandler: React.Dispatch<
    SetStateAction<{
      signUp: boolean
      login: boolean
      signUpSuccess: boolean
    }>
  >
  refetchUser: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>
}
interface SignUpFormProps {
  visibilityHandler: React.Dispatch<
    SetStateAction<{
      signUp: boolean
      login: boolean
      signUpSuccess: boolean
    }>
  >
}

interface SuccessProps {
  title: string
  subtitle: string
}

interface ErrorProps {
  title: string
  subtitle: string
}

interface ValidatePasswordProps {
  password: string
}

interface ValidationItemProps {
  label: string
  valid: boolean
}

type ForgotPasswordProps = Pick<SignUpFormProps, 'visibilityHandler'>

interface CTAProps {
  title: string
  subtitle: string
  buttonText: string
  buttonHref: string
  arrowText: string
}

interface AdminOptions {
  title: string
  icon: IconType
  goTo: string
}

type OptionCard = AdminOptions

interface StatsCardProps {
  title: string
  stat: number
}

interface DevotionalDashCardProps extends Devotional {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>
}

interface EventsDashCardProps extends ExternalEvent {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<QueryObserverResult<AxiosResponse<Partial<User>, any>, unknown>>
}

interface OptionsButtonProps {
  children: Element | Element[] | ReactNode | ReactNode[]
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

type EditorProps = Pick<ModalProps, 'onClose'>

interface WrapperProps {
  children: React.ReactNode | React.ReactNode[]
}

interface SimpleEmptyStateProps { title: string }