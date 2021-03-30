import { CalendarEvent, Event } from '../@types/calendar'
import { LOGGER } from '../log'
import { filterActive, getAllEvents } from './ical'

export const getActiveEvent = async (): Promise<Event | undefined> => {
  const allEvents = await getAllEvents()

  if (allEvents === undefined) {
    return undefined
  }

  const activeEvents = filterActive(allEvents).map(mapEvent)

  const currentEvent = chooseEvent(activeEvents)

  LOGGER.debug(`Found ${ activeEvents.length } active events`, activeEvents)

  return currentEvent
}

const mapEvent = (event: CalendarEvent): Event => ({
  title: event.summary,
  start: event.start.toISOString(),
  end: event.end.toISOString()
})

export const chooseEvent = (events: Event[]): Event | undefined => {
  // TODO: be cleverer when choosing the event to use
  return events[0]
}
