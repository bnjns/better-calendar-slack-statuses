import { execute, handleCalendarEvent } from './index'
import { clearStatus } from './slack'
import { Event } from './@types/calendar'
import moment from 'moment/moment'
import { dateFormat } from './event/dates'
import { getActiveEvent } from './calendar'
import { CommandAction } from './@types/local'

const action = process.argv.slice(2)[0] as CommandAction;

(async () => {
  if (action === 'update-status') {
    const event: Event = {
      title: process.argv.slice(3)[0],
      start: moment().format(dateFormat),
      end: moment().add(1, 'hour').format(dateFormat)
    }

    await handleCalendarEvent(event)
  } else if (action === 'clear-status') {
    await clearStatus()
  } else if (action === 'calendar') {
    await getActiveEvent()
  } else if (action === 'exec') {
    await execute()
  } else {
    throw Error(`Unknown action ${ action }`)
  }
})()
