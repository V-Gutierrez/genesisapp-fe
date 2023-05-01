import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const AnniversarySection = dynamic(
  () => import('sections/Client/Events/13anosgenesis/Anniversary'),
  {
    ssr: false,
  },
)

const Anniversary: NextPage = () => <AnniversarySection />

export default Anniversary
