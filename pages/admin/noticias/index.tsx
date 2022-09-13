import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const News = dynamic(() => import('sections/Admin/News'))

const NewsPage: NextPage = () => {
  const { isAdmin } = useUser()

  if (isAdmin) return <News />
  return <NotFound />
}

export default NewsPage
