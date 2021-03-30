import moment from 'moment/moment'

interface DoNotDisturbParams {
  enable: boolean
  start: moment.Moment
  end: moment.Moment
}

interface PresenceParams {
  setAway: boolean
}

interface StatusParams {
  status: string
  emoji: string
  expire: moment.Moment
}
