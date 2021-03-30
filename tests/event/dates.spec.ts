import moment from 'moment/moment'
import { parseDate } from '../../src/event/dates'

describe('parsing dates', () => {
  it('should parse a valid UTC date string', () => {
    const dateString = '2021-03-25T17:00:00.000Z'
    const expectedDate = moment().utc().year(2021).month(2).date(25).hour(17).minute(0).second(0).millisecond(0)

    const parsedDate = parseDate(dateString)

    expect(parsedDate.unix()).toEqual(expectedDate.unix())
  })

  it('should throw an error for an empty date string', () => {
    const dateString = ''

    expect(() => parseDate(dateString)).toThrow('Could not parse date')
  })

  it('should throw an error for an invalid date string', () => {
    const dateString = 'invalid'

    expect(() => parseDate(dateString)).toThrow('Could not parse date')
  })
})
