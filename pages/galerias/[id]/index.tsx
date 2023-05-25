import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

/* @ts-ignore */
const GallerySection = dynamic(() => import('sections/Client/Galleries/GallerySection'))

const GalleryPage: NextPage = () => <GallerySection />

export default GalleryPage
