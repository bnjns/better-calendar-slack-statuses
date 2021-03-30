import { Event } from '../@types/calendar'
import { ParsedEvent } from '../@types/event'
import { extractEmoji } from './emoji'
import { extractTags, hasAwayTag, hasDoNotDisturbTag } from './tags'
import { parseDate } from './dates'

export const processEvent = (event: Event): ParsedEvent => {
  const start = parseDate(event.start)
  const end = parseDate(event.end)

  const { tags, title: titleWithoutTags } = extractTags(event.title)
  const { emoji, title: titleWithoutEmoji } = extractEmoji(titleWithoutTags, tags)

  return {
    title: titleWithoutEmoji.trim(),
    emoji,
    start,
    end,
    setDoNotDisturb: hasDoNotDisturbTag(tags),
    setAway: hasAwayTag(tags)
  }
}

