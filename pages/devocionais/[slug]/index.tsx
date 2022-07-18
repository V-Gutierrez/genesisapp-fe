import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const DevotionalSection = dynamic(() => import('sections/Devotionals/DevotionalSection'))

const DevotionalPage: NextPage = () => <DevotionalSection />

export default DevotionalPage
