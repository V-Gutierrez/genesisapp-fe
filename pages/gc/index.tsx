import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const GrowthGroups = dynamic(() => import('sections/Client/GrowthGroups'))

const GrowthGroupsPage: NextPage = () => (
  <>
    <Head>
      <title>Gênesis Church - Grupos de Crescimento</title>
    </Head>
    <GrowthGroups />
  </>
)

export default GrowthGroupsPage
