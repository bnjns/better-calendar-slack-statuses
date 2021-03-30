import { PresenceParams } from '../@types/slack'
import { callWebApi } from './config'
import { LOGGER } from '../log'

export const handlePresence = async ({ setAway }: PresenceParams) => {
  const presence = setAway ? 'away' : 'auto'
  const success = await callWebApi(client => client.users.setPresence({ presence }))
  
  if (success) {
    LOGGER.info(`Set presence to: ${ presence }`)
  } else {
    LOGGER.warn(`Failed to set presence to ${ presence }`)
  }
}
