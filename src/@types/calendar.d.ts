import { VEvent } from 'node-ical'
import moment from 'moment'

export type iCalEvent = Omit<VEvent, 'start' | 'end'>  & {
  start: Date
  startTz?: string
  end: Date
  endTz?: string
}

export interface Event {
  title: string
  start: string
  end: string
}

export type CalendarEvent = Omit<iCalEvent, 'start' | 'startTz' | 'end' | 'endTz'> & {
  start: moment.Moment
  end: moment.Moment
}
