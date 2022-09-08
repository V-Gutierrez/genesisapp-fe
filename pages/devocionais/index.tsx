import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Devocionais = dynamic(() => import('sections/Client/Devotionals'))

const Devotionals: NextPage = () => (
  <>
    <Head>
      <title>Gênesis Church - Devocionais</title>
    </Head>
    <Devocionais />
  </>
)

export default Devotionals
