import { DoNotDisturbParams } from '../@types/slack'
import { callWebApi } from './config'
import { LOGGER } from '../log'

export const handleDoNotDisturb = async ({ enable, start, end }: DoNotDisturbParams) => {
  if (enable) {
    const success = await callWebApi(client => client.dnd.setSnooze({
      num_minutes: end.diff(start, 'minutes')
    }))

    if (success) {
      LOGGER.info('Successfully enabled Do Not Disturb')
    } else {
      LOGGER.warn('Failed to enable Do Not Disturb')
    }
  } else {
    const success = await callWebApi(client => client.dnd.endSnooze())

    if (success) {
      LOGGER.info('Successfully disabled Do Not Disturb')
    } else {
      LOGGER.warn('Failed to disable Do Not Disturb (it may already be disabled)')
    }
  }
}
