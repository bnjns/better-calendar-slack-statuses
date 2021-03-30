import { handleDoNotDisturb } from './dnd'
import { handlePresence } from './presence'
import { handleClearStatus, handleStatus } from './status'
import { ParsedEvent } from '../@types/event'
import moment from 'moment/moment'

export const updateStatus = async ({ title, emoji, start, end, setDoNotDisturb, setAway }: ParsedEvent) => {
  await handleDoNotDisturb({
    enable: setDoNotDisturb,
    start,
    end
  })

  await handlePresence({
    setAway
  })

  await handleStatus({
    status: title,
    emoji,
    expire: end
  })
}

export const clearStatus = async () => {
  const now = moment()
  
  await handleDoNotDisturb({ enable: false, start: now, end: now })
  await handlePresence({ setAway: false })
  await handleClearStatus()
}
