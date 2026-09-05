import { IdCommand } from '@vorasion/commands'

import type { BotInstance } from '..'

export default (bot: BotInstance) => bot.command('id', (ctx) => new IdCommand<BotInstance>().runTelegram(ctx))
