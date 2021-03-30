import {
  determineFromTags,
  determineFromTitle,
  EMOJIS,
  extractEmoji,
  extractFromTitle,
  getFirstValidEmoji
} from '../../src/event/emoji'
import arrayContaining = jasmine.arrayContaining

describe('extracting emoji from the title', () => {
  describe('an empty title', () => {
    const titleString = ''
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract no emoji', () => {
      expect(emoji).toHaveLength(0)
    })

    it('should return the original title', () => {
      expect(title).toEqual(titleString)
    })
  })

  describe('a title with no emoji', () => {
    const titleString = 'A meeting'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract no tags', () => {
      expect(emoji).toHaveLength(0)
    })

    it('should return the original title', () => {
      expect(title).toEqual(titleString)
    })
  })

  describe('a title with an emoji at the beginning', () => {
    const titleString = ':emoji: A meeting'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract the tag', () => {
      expect(emoji).toHaveLength(1)
      expect(emoji).toEqual(arrayContaining(['emoji']))
    })

    it('should return the title with the emoji removed and no leading whitespace', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with an emoji at the end', () => {
    const titleString = 'A meeting :emoji:'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract the emoji', () => {
      expect(emoji).toHaveLength(1)
      expect(emoji).toEqual(arrayContaining(['emoji']))
    })

    it('should return the title with the emoji removed and no trailing whitespace', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with an emoji in the middle', () => {
    const titleString = 'A :emoji: meeting'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract the emoji', () => {
      expect(emoji).toHaveLength(1)
      expect(emoji).toEqual(arrayContaining(['emoji']))
    })

    it('should return the title with the emoji and extra whitespace removed', () => {
      expect(title).toEqual('A meeting')
    })
  })

  describe('a title with multiple emojis', () => {
    const titleString = ':emoji1: A meeting with :emoji2: multiple tags :emoji3:'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract the emojis', () => {
      expect(emoji).toHaveLength(3)
      expect(emoji).toEqual(arrayContaining(['emoji1', 'emoji2', 'emoji3']))
    })

    it('should return the title with the emojis and extra whitespace removed', () => {
      expect(title).toEqual('A meeting with multiple tags')
    })
  })

  describe('a title with an uppercase emoji', () => {
    const titleString = 'A :EMOJI: meeting'
    const { emoji, title } = extractFromTitle(titleString)

    it('should extract the emoji with the correct case', () => {
      expect(emoji).toHaveLength(1)
      expect(emoji).toEqual(arrayContaining(['emoji']))
    })

    it('should return the title with the emoji and extra whitespace removed', () => {
      expect(title).toEqual('A meeting')
    })
  })
})

describe('determining emoji from tags', () => {
  it('should return undefined for an empty list of tags', () => {
    const emoji = determineFromTags([])

    expect(emoji).toBeUndefined()
  })

  it('should return undefined for a list of tags with no recognised tags', () => {
    const emoji = determineFromTags(['TAG1', 'TAG2'])

    expect(emoji).toBeUndefined()
  })

  it('should return the correct emoji if the list contains DND', () => {
    const emoji = determineFromTags(['TAG1', 'DND', 'TAG2'])

    expect(emoji).toEqual(EMOJIS.DND)
  })
})

describe('determining emoji from title', () => {
  const jira = ['jira', 'JIRA', 'Jira']
  const interview = ['interview', 'INTERVIEW', 'Interview']

  it('should return undefined for an empty title', () => {
    const emoji = determineFromTitle('')

    expect(emoji).toBeUndefined()
  })

  it.each(jira)('should return the correct emoji when the title contains %p', (text) => {
    const emoji = determineFromTitle(`A meeting with ${ text } in it`)

    expect(emoji).toEqual(EMOJIS.JIRA)
  })

  it.each(interview)('should return the correct emoji when the title contains %p', (text) => {
    const emoji = determineFromTitle(`A meeting with ${ text } in it`)

    expect(emoji).toEqual(EMOJIS.INTERVIEW)
  })
})

describe('getting the first valid emoji', () => {
  it('should return undefined for an empty array', () => {
    const emoji = getFirstValidEmoji([])

    expect(emoji).toBeUndefined()
  })

  it('should return the first emoji', () => {
    const emoji = getFirstValidEmoji(['emoji1', 'emoji2'])

    expect(emoji).toBe('emoji1')
  })
})

describe('extracting emoji from the title', () => {
  describe('an empty title and no tags', () => {
    const titleString = ''
    const tags: string[] = []
    const { emoji, title } = extractEmoji(titleString, tags)

    it('should return the default emoji', () => {
      expect(emoji).toBe(EMOJIS.DEFAULT)
    })

    it('should return the original title', () => {
      expect(title).toBe(titleString)
    })
  })

  describe('a simple title', () => {
    const titleString = 'A meeting'

    describe('no tags', () => {
      const tags: string[] = []
      const { emoji, title } = extractEmoji(titleString, tags)

      it('should return the default emoji', () => {
        expect(emoji).toBe(EMOJIS.DEFAULT)
      })

      it('should return the original title', () => {
        expect(title).toBe(titleString)
      })
    })

    describe('tags that have a custom emoji', () => {
      const tags: string[] = ['DND']
      const { emoji, title } = extractEmoji(titleString, tags)

      it('should return the correct emoji', () => {
        expect(emoji).toBe(EMOJIS.DND)
      })

      it('should return the original title', () => {
        expect(title).toBe(titleString)
      })
    })
  })

  describe(' a title with a pre-determined emoji', () => {
    const titleString = 'A jira meeting'

    describe('no tags', () => {
      const tags: string[] = []
      const { emoji, title } = extractEmoji(titleString, tags)

      it('should return the pre-determined emoji', () => {
        expect(emoji).toBe(EMOJIS.JIRA)
      })

      it('should return the original title', () => {
        expect(title).toBe(titleString)
      })
    })

    describe('tags that have a custom emoji', () => {
      const tags: string[] = ['DND']
      const { emoji, title } = extractEmoji(titleString, tags)

      it('should return the emoji from the title', () => {
        expect(emoji).toBe(EMOJIS.JIRA)
      })

      it('should return the original title', () => {
        expect(title).toBe(titleString)
      })
    })
  })

  describe(' a title with a specified emoji', () => {
    const expectedEmoji = 'emoji'
    const titleString = `:${ expectedEmoji }: A meeting`

    describe('no tags', () => {
      const tags: string[] = []
      const { emoji } = extractEmoji(titleString, tags)

      it('should return the specified emoji', () => {
        expect(emoji).toBe(expectedEmoji)
      })
    })

    describe('tags that have a custom emoji', () => {
      const tags: string[] = ['DND']
      const { emoji } = extractEmoji(titleString, tags)

      it('should return the specified emoji from the title', () => {
        expect(emoji).toBe(expectedEmoji)
      })
    })
  })

  describe(' a title with a specified emoji and pre-determined emoji', () => {
    const expectedEmoji = 'emoji'
    const titleString = `:${ expectedEmoji }: A jira meeting`

    describe('no tags', () => {
      const tags: string[] = []
      const { emoji } = extractEmoji(titleString, tags)

      it('should return the specified emoji', () => {
        expect(emoji).toBe(expectedEmoji)
      })
    })

    describe('tags that have a custom emoji', () => {
      const tags: string[] = ['DND']
      const { emoji } = extractEmoji(titleString, tags)

      it('should return the specified emoji from the title', () => {
        expect(emoji).toBe(expectedEmoji)
      })
    })
  })
})
