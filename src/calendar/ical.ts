import * as ical from 'node-ical'
import { CalendarComponent } from 'node-ical'
import { CalendarEvent, iCalEvent } from '../@types/calendar'
import moment from 'moment/moment'
import { LOGGER } from '../log'

export const getAllEvents = async (): Promise<iCalEvent[] | undefined> => {
  const calendarUrl = process.env.CALENDAR_URL

  if (calendarUrl === undefined) {
    LOGGER.warn('Skipping calendar retrieval as CALENDAR_URL not set')
    return undefined
  }

  return Object.values(await ical.fromURL(calendarUrl))
    .map(e => formatEvent(e))
    .filter(e => e !== null) as iCalEvent[]
}

const formatEvent = (event: CalendarComponent): iCalEvent | null => {
  if (event.type !== 'VEVENT') {
    return null
  }

  return {
    ...event,
    start: new Date(event.start.toISOString()),
    startTz: event.start.tz,
    end: new Date(event.end.toISOString()),
    endTz: event.end.tz
  }
}

// TODO: handle exceptions to the RRule? eg, recurring events where a single instance has been changed/removed
export const filterActive = (events: iCalEvent[]): CalendarEvent[] => {
  const now = moment()

  return events.map(event => {
      const [eventStart, eventEnd] = determineNextOccurrence(event)
      const hasStarted = eventStart.isSameOrBefore(now)
      const hasEnded = eventEnd.isBefore(now)
      const isActive = hasStarted && !hasEnded

      // if(event.summary === ':no_entry: Focus time') {
      //   console.log('eventStart', eventStart)
      //   console.log('eventEnd', eventEnd)
      //   console.log('now', now)
      // }

      return !isActive ? null : {
        ...event,
        start: eventStart,
        end: eventEnd
      }
    })
    .filter(e => e !== null) as CalendarEvent[]
}

export const determineNextOccurrence = ({
  start,
  end,
  rrule
}: Pick<iCalEvent, 'start' | 'end' | 'rrule'>): [moment.Moment, moment.Moment] => {
  const eventStart = moment(start)
  const eventEnd = moment(end)

  if (rrule !== undefined) {
    const now = moment()

    const todayOccurrenceStart = toMoment(
      rrule.between(
        now.startOf('day').toDate(),
        now.endOf('day').toDate(),
        true
      ).shift()
    )

    if (todayOccurrenceStart === undefined) {
      return [eventStart, eventEnd]
    } else {
      const eventDuration = eventEnd.diff(eventStart, 'seconds')
      const todayOccurrenceEnd = moment(todayOccurrenceStart).add(eventDuration, 'seconds')

      return [todayOccurrenceStart, todayOccurrenceEnd]
    }
  } else {
    return [eventStart, eventEnd]
  }
}

const toMoment = (date?: Date): moment.Moment | undefined => {
  return date && moment(date)
}
