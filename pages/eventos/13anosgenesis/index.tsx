import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AnniversarySection = dynamic(() => import('pages/eventos/13anosgenesis/Anniversary'))

const Anniversary: NextPage = () => <AnniversarySection />

export default Anniversary
