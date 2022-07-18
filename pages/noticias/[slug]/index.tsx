import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const NewsSection = dynamic(() => import('sections/News/NewsSection'))

const DevotionalPage: NextPage = () => <NewsSection />

export default DevotionalPage
