import type { NextPage } from 'next'
import NotFound from 'pages/404'
import dynamic from 'next/dynamic'
import { useUser } from 'context/UserContext'

const GrowthGroups = dynamic(() => import('sections/Admin/GrowthGroups'))

const GrowthGroupsPage: NextPage = () => {
  const { isAdmin } = useUser()

  if (isAdmin) return <GrowthGroups />
  return <NotFound />
}

export default GrowthGroupsPage
