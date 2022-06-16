import CTA from 'components/CTA'
import type { NextPage } from 'next'

const OfflinePage: NextPage = () => (
  <CTA title="Oops!" subtitle="Parece que você está offline!" buttonText="Tentar novamente" buttonHref="/" arrowText="Clique aqui" />
)

export default OfflinePage
