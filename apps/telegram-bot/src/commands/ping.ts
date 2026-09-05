import { PingCommand } from '@vorasion/commands'

import type { BotInstance } from '..'

export default (bot: BotInstance) => bot.command('ping', (ctx) => new PingCommand<BotInstance>().runTelegram(ctx))
