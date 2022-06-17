import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const HomeSection = dynamic(() => import('sections/Home'))

const Home: NextPage = () => <HomeSection />;

export default Home;
