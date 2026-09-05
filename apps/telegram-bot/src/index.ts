import { autoRetry } from '@gramio/auto-retry'
import { autoload } from '@gramio/autoload'
import env from '@vorasion/env'
import { Bot } from 'gramio'

import logger from './logger'

if (!env.TELEGRAM_TOKEN)
  throw new Error(
    'TELEGRAM_TOKEN is not defined in the environment variables, but it is required to run the Telegram bot.',
  )

const bot = new Bot(env.TELEGRAM_TOKEN)
  .extend(await autoload())
  .extend(autoRetry())
  .onError(({ context, kind, error }) => logger.error(`${kind} error occurred in context ${context}: ${error.message}`))
  .onStart(({ plugins, info }) => {
    logger.info(`Bot started with username ${info.username}`)
    logger.info(`Loaded ${plugins.length} plugins: ${plugins.join(', ')}`)
  })

bot.start()

export type BotInstance = typeof bot
