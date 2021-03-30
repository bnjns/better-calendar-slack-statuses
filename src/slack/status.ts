import { StatusParams } from '../@types/slack'
import { callWebApi } from './config'
import { LOGGER } from '../log'

const setStatus = async (profile: string) => {
  const success = await callWebApi(client => client.users.profile.set({ profile }))

  if (success) {
    LOGGER.info(`Set status to ${ profile }`)
  } else {
    LOGGER.warn('Failed to set user status')
  }
}

export const handleStatus = async ({ status, emoji, expire }: StatusParams) => {
  const profile = JSON.stringify({
    'status_text': status,
    'status_emoji': `:${ emoji }:`,
    'status_expiration': expire.unix()
  })

  await setStatus(profile)
}

export const handleClearStatus = async () => {
  const profile = JSON.stringify({
    'status_text': null,
    'status_emoji': null,
    'status_expiration': null
  })

  await setStatus(profile)
}
