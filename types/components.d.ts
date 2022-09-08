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
  onClick: () => void
}

interface SidebarProps {
  onClose: () => void
}
interface CustomSliderProps<T> {
  children: ReactNode | ReactNode[]
  customSettings?: T
  customRef?: React.Ref<any>
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

type ReactQueryRefetch<T> = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<QueryObserverResult<AxiosResponse<T, any> | undefined, unknown>>

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
  refetchUser: ReactQueryRefetch<Partial<User>>
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
  refetchUser: ReactQueryRefetch<Partial<User>>
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
  refetch: ReactQueryRefetch<Partial<User>>
}
interface EventCardProps extends EventItem {
  refetch: ReactQueryRefetch<Partial<User>>
}
interface NewsDashCardProps extends News {
  refetch: ReactQueryRefetch<Partial<User>>
}

interface EventsDashCardProps extends ExternalEvent {
  refetch: ReactQueryRefetch<Partial<User>>
}

interface SubscriptionFormProps extends EventItem {
  eventId: string
  refetch: ReactQueryRefetch<EventItem>
}

interface OptionsButtonProps {
  children: Element | Element[] | ReactNode | ReactNode[]
  noBackground?: boolean
}

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

type EditorProps = Pick<ModalProps, 'onClose'>

interface WrapperProps {
  children: React.ReactNode | React.ReactNode[]
}

interface SimpleEmptyStateProps {
  title: string
}

interface NextImageProps<Image, Box> {
  BoxProps?: Box
  ImageProps: Image
}

interface GoogleImageMosaicBlockProps<LayoutWidthProps, LayoutHeightProps> {
  photo: GooglePhotosImageSet
  imageBlockWidth: LayoutWidthProps
  imageBlockHeight: LayoutHeightProps
}

interface GoogleImagesGalleryProps<
  FlexPropsType,
  MosaicBlockLayoutWidthProps,
  MosaicBlockLayoutHeightProps,
> {
  FlexProps: FlexPropsType
  queryKey: string
  albumUrl: string
  imageBlockWidth: MosaicBlockLayoutWidthProps
  imageBlockHeight: MosaicBlockLayoutHeightProps
}
interface PageWithHeadingImageProps {
  pageTitle: string
  headingImage: string
  children: React.ReactNode | React.ReactNode[]
}

interface MenuDropdownProps<IconType> {
  icon: IconType
  children?: JSX.Element[] | JSX.Element
  title: string
}

interface InteractionProps {
  onLikeInteraction?: () => void
  onDislikeInteraction?: () => void
  liked?: boolean
  views: number
  likes: number
  shareContent?: string
  showOnlyShare?: boolean
}

interface SubscribersModalProps extends ModalProps {
  subscribers: EventsSubscription[]
}

interface SubscribersTableProps {
  subscribers: EventsSubscription[]
}
