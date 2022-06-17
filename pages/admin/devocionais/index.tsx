import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const Devotionals = dynamic(() => import('sections/Admin/Devotionals'))

const DevotionalsPage: NextPage = () => {
  const { isAdmin } = useUser()

  if (isAdmin) return <Devotionals />
  return <NotFound />
}

export default DevotionalsPage
