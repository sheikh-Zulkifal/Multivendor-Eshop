import React from 'react'
import Header from '../Components/layout/Header'
import EventCard from '../Components/Events/EventCard'

const EventsPage = () => {
  return (
    <div>
      <Header activeHeading={4} />
      <EventCard active={true} />
      <EventCard active={true} />
    </div>
  )
}

export default EventsPage
