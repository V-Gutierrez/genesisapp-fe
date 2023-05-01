import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AboutUs = dynamic(() => import('sections/Client/AboutUs'))

const AboutUsPage: NextPage = () => <AboutUs />

export default AboutUsPage
