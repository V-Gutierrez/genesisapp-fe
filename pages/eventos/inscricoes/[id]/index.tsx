import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

/* @ts-ignore */
const EventSection = dynamic(() => import('sections/Events/EventSection'))

const EventPage: NextPage = () => <EventSection />

export default EventPage
