import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const Events = dynamic(() => import('sections/Admin/Events'))

const EventsPage: NextPage = () => {
  const { isAdmin, userData } = useUser()

  if (!userData) return null
  if (isAdmin) return <Events />
  return <NotFound />
}

export default EventsPage
