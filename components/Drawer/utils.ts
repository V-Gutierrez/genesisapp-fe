import { StarIcon } from '@chakra-ui/icons'
import { BiBible, BiCake } from 'react-icons/bi'
import { FiStar, FiHome, FiBook } from 'react-icons/fi'
import { GrGallery } from 'react-icons/gr'
import { IoNewspaper, IoTrailSignOutline } from 'react-icons/io5'
import { MdOutlineLeaderboard } from 'react-icons/md'

export const extraordinaryRoutes = ['/eventos/13anosgenesis']

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiStar, goTo: '/' },
  { name: 'Encontre seu GC', icon: FiHome, goTo: '/gc' },
  { name: 'Devocionais', icon: FiBook, goTo: '/devocionais' },
  { name: 'Notícias', icon: IoNewspaper, goTo: '/noticias' },
  { name: 'Eventos', icon: IoTrailSignOutline, goTo: '/eventos' },
  { name: 'Galerias', icon: GrGallery, goTo: '/galerias' },
]

export const SecondChunkOfLinkItems: Array<LinkItemProps> = [
  { name: 'Quem somos', icon: BiBible, goTo: '/quem-somos' },
]

export const SpecialEventsLinks: Array<LinkItemProps> = [
  { name: 'Aniversário de 13 anos', icon: StarIcon, goTo: '/eventos/13anosgenesis' },
]

export const AdminItems: Array<LinkItemProps> = [
  { name: 'Administração', icon: MdOutlineLeaderboard, goTo: '/admin' },
]
