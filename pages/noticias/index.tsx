import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const News = dynamic(() => import('sections/Client/News'))

const Devotionals: NextPage = () => (
  <>
    <Head>
      <title>Gênesis Church - Notícias</title>
    </Head>
    <News />
  </>
)

export default Devotionals
