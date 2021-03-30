import { ParsedTags } from '../@types/event'
import { LOGGER } from '../log'
import { removeExtraWhitespace } from '../utils/text'

const tagRegex = /(\[[\w]+])/g

export const extractTags = (title: string): ParsedTags => {
  const matchedTags = title.match(tagRegex)
      ?.map(tag => tag.replace(/\[/g, ''))
      ?.map(tag => tag.replace(/]/g, ''))
      ?.map(tag => tag.toUpperCase().trim())
    ?? []

  LOGGER.debug(`Found ${ matchedTags.length } tags in title`, matchedTags)

  return {
    tags: matchedTags,
    title: removeExtraWhitespace(title.replace(tagRegex, ''))
  }
}

export const hasDoNotDisturbTag = (tags: string[]): boolean => tags
  .filter(tag => tag.toUpperCase().trim() === 'DND')
  .length > 0

export const hasAwayTag = (tags: string[]): boolean => tags
  .filter(tag => tag.toUpperCase().trim() === 'AWAY')
  .length > 0


