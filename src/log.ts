import * as log from 'lambda-log'

const LOGGER = new log.LambdaLog()

LOGGER.options.debug = process.env.NODE_ENV === 'development'

export { LOGGER }
