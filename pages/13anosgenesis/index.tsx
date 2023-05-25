import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AnniversarySection = dynamic(
  () => import('sections/Client/Events/13anosgenesis/Anniversary')
)

const Anniversary: NextPage = () => <AnniversarySection />

export default Anniversary
