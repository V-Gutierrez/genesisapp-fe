import { FiStar, FiHome, FiBook } from 'react-icons/fi'
import { IoNewspaper } from 'react-icons/io5'

export const extraordinaryRoutes = ['/eventos/13anosgenesis']

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FiStar, goTo: '/' },
  { name: 'Encontre seu GC', icon: FiHome, goTo: '/gc' },
  { name: 'Devocionais', icon: FiBook, goTo: '/devocionais' },
  { name: 'Notícias', icon: IoNewspaper, goTo: '/noticias' },
]
