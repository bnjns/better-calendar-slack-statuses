import { WebAPICallResult, WebClient } from '@slack/web-api'
import { LOGGER } from '../log'

const token = process.env.SLACK_TOKEN
const client = token ? new WebClient(token) : undefined

export const callWebApi = async (fn: (client: WebClient) => Promise<WebAPICallResult>): Promise<boolean> => {
  if (client === undefined) {
    LOGGER.warn('Skipping Slack API call as SLACK_TOKEN not set')
    return false
  }


  try {
    const { ok } = await fn(client)
    return ok
  } catch (e) {
    LOGGER.debug('Received error from Slack', e)
    return false
  }
}
