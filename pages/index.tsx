import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const HomeSection = dynamic(() => import('sections/Client/Home'))

const Home: NextPage = () => <HomeSection />

export default Home
