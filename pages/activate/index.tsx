import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Activate = dynamic(() => import('sections/Client/Activate'))

const ActivatePage: NextPage = () => <Activate />

export default ActivatePage
