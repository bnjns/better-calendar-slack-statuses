import { ExtractedEmoji, ParsedEmoji } from '../@types/event'
import { LOGGER } from '../log'
import { removeExtraWhitespace } from '../utils/text'

export const EMOJIS = {
  DEFAULT: 'calendar',
  DND: 'no_entry',
  JIRA: 'jira2',
  INTERVIEW: 'interview'
}

const emojiRegex = /(:[a-zA-Z0-9_-]+:)/g

export const extractFromTitle = (title: string): ExtractedEmoji => {
  const matchedEmoji = title.match(emojiRegex)
    ?.map(emoji => emoji.replace(/:/g, ''))
    ?.map(emoji => emoji.toLowerCase().trim())
    ?? []

  return {
    emoji: matchedEmoji,
    title: removeExtraWhitespace(title.replace(emojiRegex, ''))
  }
}

export const determineFromTags = (tags: string[]): string | undefined => {
  if (tags.indexOf('DND') > -1) {
    return EMOJIS.DND
  }

  return undefined
}

export const determineFromTitle = (title: string): string | undefined => {
  if (title.match(/jira/gi)) {
    return EMOJIS.JIRA
  }

  if (title.match(/interview/gi)) {
    return EMOJIS.INTERVIEW
  }

  return undefined
}

export const getFirstValidEmoji = (emoji: string[]): string | undefined => {
  // TODO: find a way to check the emoji is valid
  return emoji[0]
}

export const extractEmoji = (title: string, tags: string[]): ParsedEmoji => {
  const { emoji, title: titleWithoutEmoji } = extractFromTitle(title)

  const titleEmoji = determineFromTitle(titleWithoutEmoji)
  if (titleEmoji !== undefined) {
    emoji.push(titleEmoji)
  }

  const tagEmoji = determineFromTags(tags)
  if (tagEmoji !== undefined) {
    emoji.push(tagEmoji)
  }

  LOGGER.debug(`Determined ${ emoji.length } emoji from event`, emoji)

  return {
    emoji: getFirstValidEmoji(emoji) || EMOJIS.DEFAULT,
    title: titleWithoutEmoji
  }
}
