import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const Users = dynamic(() => import('sections/Admin/Users'))

const DevotionalsPage: NextPage = () => {
  const { isAdmin, userData } = useUser()

  if (!userData) return null
  if (isAdmin) return <Users />
  return <NotFound />
}

export default DevotionalsPage
