import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const CTA = dynamic(() => import('components/CTA'))

const OfflinePage: NextPage = () => (
  <CTA title="Oops!" subtitle="Parece que você está offline!" buttonText="Tentar novamente" buttonHref="/" arrowText="" />
)

export default OfflinePage
