import { Event } from './@types/calendar'
import { processEvent } from './event'
import { clearStatus, updateStatus } from './slack'
import { getActiveEvent } from './calendar'
import { LOGGER } from './log'

export const handleCalendarEvent = async (event: Event) => {
  LOGGER.debug('Received event', event)

  const processedEvent = processEvent(event)

  LOGGER.debug('Processed event', processedEvent)

  await updateStatus(processedEvent)
}

export const execute = async () => {
  const currentEvent = await getActiveEvent()

  if (currentEvent === undefined) {
    await clearStatus()
  } else {
    await handleCalendarEvent(currentEvent)
  }
}
