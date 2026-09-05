import env from '@vorasion/env'
import { createLogger, format, transports } from 'winston'

const developmentFormat = format.combine(
  format.colorize(),
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
)

const productionFormat = format.combine(
  format.timestamp(),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`),
)

const isDevelopment = env.NODE_ENV !== 'production'

export const logger = createLogger({
  level: isDevelopment ? 'debug' : 'info',
  format: isDevelopment ? developmentFormat : productionFormat,
  transports: [new transports.Console()],
})

export default logger
