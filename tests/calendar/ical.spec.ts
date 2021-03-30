import { DateWithTimeZone } from 'node-ical'
import { determineNextOccurrence } from '../../src/calendar/ical'
import moment = require('moment')

describe('determining the next occurrence', () => {
  it('should handle a non-recurring event in UTC', () => {
    // @ts-ignore
    const start: DateWithTimeZone = new Date('2020-01-01T09:00:00.000Z')
    // @ts-ignore
    const end: DateWithTimeZone = new Date('2020-01-01T10:00:00.000Z')

    const expectedStart = moment('2020-01-01T09:00:00.000Z')
    const expectedEnd = moment('2020-01-01T10:00:00.000Z')

    const [nextStart, nextEnd] = determineNextOccurrence({ start, end, rrule: undefined })

    expect(nextStart).toEqual(expectedStart)
    expect(nextEnd).toEqual(expectedEnd)
  })

  it.todo('should handle a non-recurring event in DST')
})

