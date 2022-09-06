import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

/* @ts-ignore */
const NewsSection = dynamic(() => import('sections/News/NewsSection'))

const NewsPage: NextPage = () => <NewsSection />

export default NewsPage
