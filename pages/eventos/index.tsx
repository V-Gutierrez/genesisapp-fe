import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Events = dynamic(() => import('sections/Client/Events'))

const GrowthGroupsPage: NextPage = () => (
  <>
    <Head>
      <title>Gênesis Church - Eventos</title>
    </Head>
    <Events />
  </>
)

export default GrowthGroupsPage
