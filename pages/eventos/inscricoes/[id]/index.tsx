import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

/* @ts-ignore */
const EventSection = dynamic(() => import('sections/Client/Events/EventSection'))

const EventPage: NextPage = () => <EventSection />

export default EventPage
