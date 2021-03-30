import moment from 'moment/moment'

export interface ParsedTags {
  tags: string[]
  title: string
}

export interface ExtractedEmoji {
  emoji: string[]
  title: string
}

export interface ParsedEmoji {
  emoji: string
  title: string
}

export interface ParsedEvent {
  title: string
  emoji: string
  start: moment.Moment
  end: moment.Moment
  setDoNotDisturb: boolean
  setAway: boolean
}
