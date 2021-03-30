import moment from 'moment/moment'

export const dateFormat = 'MMM D, YYYY [at] hh:mmA'

export const parseDate = (date: string): moment.Moment => {
  const parsedDate = moment(date)

  if (!parsedDate.isValid()) {
    throw Error(`Could not parse date '${ date }'`)
  }

  return parsedDate
}
