import { removeExtraWhitespace } from '../../src/utils/text'

describe('removing extra whitespace', () => {
  it('should ignore if no excess whitespace', () => {
    const text = 'word'
    const expectedTrimmedText = 'word'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })

  it('should remove leading whitespace', () => {
    const text = ' word'
    const expectedTrimmedText = 'word'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })

  it('should remove trailing whitespace', () => {
    const text = 'word '
    const expectedTrimmedText = 'word'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })

  it('should not remove single spaces between words', () => {
    const text = 'two words'
    const expectedTrimmedText = 'two words'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })

  it('should replace multiple spaces between words with a single space', () => {
    const text = 'two  words'
    const expectedTrimmedText = 'two words'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })

  it('should replace all occurrences of excess whitespace', () => {
    const text = 'four  words  with   spaces '
    const expectedTrimmedText = 'four words with spaces'

    const trimmedText = removeExtraWhitespace(text)

    expect(trimmedText).toBe(expectedTrimmedText)
  })
})
