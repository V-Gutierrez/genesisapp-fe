import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const Events = dynamic(() => import('sections/Admin/Events'))

const EventsPage: NextPage = () => {
  const { isAdmin } = useUser()

  if (isAdmin) return <Events />
  return <NotFound />
}

export default EventsPage
