import Head from 'next/head'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Galleries = dynamic(() => import('sections/Client/Galleries'))

const GalleriesPage: NextPage = () => (
  <>
    <Head>
      <title>Gênesis Church - Galerias</title>
    </Head>
    <Galleries />
  </>
)

export default GalleriesPage
