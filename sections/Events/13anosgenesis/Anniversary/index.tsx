import GoogleImagesGallery from 'components/GoogleImagesGallery'
import Head from 'next/head'
import React from 'react'

const AnniversarySection: React.FC = () => (
  <>
    <Head>
      <title>Gênesis Church - Aniversário 13 anos</title>
    </Head>
    <GoogleImagesGallery
      FlexProps={{
        minH: '99vh',
        w: 'full',
        bgSize: 'cover',
        bg: 'black',
        align: 'center',
        justify: 'center',
        bgPos: 'center',
        scrollSnapType: 'y mandatory',
        flexWrap: 'wrap',
        overflow: 'auto',
      }}
      queryKey="13YearsAnniversaryPhotos"
      albumUrl="https://photos.app.goo.gl/uUmT9uEH6GeJtsoK9"
    />
  </>
)

export default AnniversarySection
