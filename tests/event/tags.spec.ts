import { extractTags, hasAwayTag, hasDoNotDisturbTag } from '../../src/event/tags'
import arrayContaining = jasmine.arrayContaining

describe('extracting tags from the title', () => {
  describe('an empty title', () => {
    const titleString = ''
    const { tags, title } = extractTags(titleString)

    it('should extract no tags', () => {
      expect(tags).toHaveLength(0)
    })

    it('should return the original title', () => {
      expect(title).toEqual(titleString)
    })
  })

  describe('a title with no tags', () => {
    const titleString = 'A meeting'
    const { tags, title } = extractTags(titleString)

    it('should extract no tags', () => {
      expect(tags).toHaveLength(0)
    })

    it('should return the original title', () => {
      expect(title).toEqual(titleString)
    })
  })

  describe('a title with a tag at the beginning', () => {
    const titleString = '[TAG] A meeting'
    const { tags, title } = extractTags(titleString)

    it('should extract the tag', () => {
      expect(tags).toHaveLength(1)
      expect(tags).toEqual(arrayContaining(['TAG']))
    })

    it('should return the title with the tag removed and no leading whitespace', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with a tag at the end', () => {
    const titleString = 'A meeting [TAG]'
    const { tags, title } = extractTags(titleString)

    it('should extract the tag', () => {
      expect(tags).toHaveLength(1)
      expect(tags).toEqual(arrayContaining(['TAG']))
    })

    it('should return the title with the tag removed and no trailing whitespace', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with a tag in the middle', () => {
    const titleString = 'A [TAG] meeting'
    const { tags, title } = extractTags(titleString)

    it('should extract the tag', () => {
      expect(tags).toHaveLength(1)
      expect(tags).toEqual(arrayContaining(['TAG']))
    })

    it('should return the title with the tags and extra whitespace removed', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with multiple tags', () => {
    const titleString = '[TAG1] A meeting with [TAG2] multiple tags [TAG3]'
    const { tags, title } = extractTags(titleString)

    it('should extract the tag', () => {
      expect(tags).toHaveLength(3)
      expect(tags).toEqual(arrayContaining(['TAG1', 'TAG2', 'TAG3']))
    })

    it('should return the title with the tags and extra whitespace removed', () => {
      expect(title).toEqual('A meeting with multiple tags')
    })
  })

  describe('a title with a lowercase tag', () => {
    const titleString = 'A [tag] meeting'
    const { tags, title } = extractTags(titleString)

    it('should extract the tag with the correct case', () => {
      expect(tags).toHaveLength(1)
      expect(tags).toEqual(arrayContaining(['TAG']))
    })

    it('should return the title with the tags and extra whitespace removed', () => {
      expect(title).toEqual('A meeting')
    })
  })
})

describe('testing for the do not disturb tag', () => {
  it('should return false for an empty list of tags', () => {
    const tags: string[] = []

    expect(hasDoNotDisturbTag(tags)).toBeFalsy()
  })

  it('should return false if tag is not present in a non-empty list', () => {
    const tags = ['FIRST', 'SECOND', 'THIRD', 'FOURTH']

    expect(hasDoNotDisturbTag(tags)).toBeFalsy()
  })


  it('should return true if it is the only tag', () => {
    const tags = ['DND']

    expect(hasDoNotDisturbTag(tags)).toBeTruthy()
  })

  it('should return true if it is in the list of tags', () => {
    const tags = ['FIRST', 'DND', 'THIRD', 'FOURTH']

    expect(hasDoNotDisturbTag(tags)).toBeTruthy()
  })

  it('should handle the tag in any case', () => {
    const tags = ['FIRST', 'dnd', 'THIRD', 'FOURTH']

    expect(hasDoNotDisturbTag(tags)).toBeTruthy()
  })

  it('should handle a tag with whitespace', () => {
    const tags = ['FIRST', '  DND ', 'THIRD', 'FOURTH']

    expect(hasDoNotDisturbTag(tags)).toBeTruthy()
  })
})

describe('testing for the away tag', () => {
  it('should return false for an empty list of tags', () => {
    const tags: string[] = []

    expect(hasAwayTag(tags)).toBeFalsy()
  })

  it('should return false if tag is not present in a non-empty list', () => {
    const tags = ['FIRST', 'SECOND', 'THIRD', 'FOURTH']

    expect(hasAwayTag(tags)).toBeFalsy()
  })


  it('should return true if it is the only tag', () => {
    const tags = ['AWAY']

    expect(hasAwayTag(tags)).toBeTruthy()
  })

  it('should return true if it is in the list of tags', () => {
    const tags = ['FIRST', 'AWAY', 'THIRD', 'FOURTH']

    expect(hasAwayTag(tags)).toBeTruthy()
  })

  it('should handle the tag in any case', () => {
    const tags = ['FIRST', 'away', 'THIRD', 'FOURTH']

    expect(hasAwayTag(tags)).toBeTruthy()
  })

  it('should handle a tag with whitespace', () => {
    const tags = ['FIRST', '  AWAY ', 'THIRD', 'FOURTH']

    expect(hasAwayTag(tags)).toBeTruthy()
  })
})
