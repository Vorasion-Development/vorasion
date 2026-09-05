import type { Awaitable } from '@sapphire/utilities'
import { createCommandMixin, createSubcommandMixin } from '@vorasion/decorators'
import type { Bot, MessageContext } from 'gramio'

import type { BotCommandConstructor, BotSubcommandConstructor, DiscordCommandContext } from './types'

abstract class BaseBotCommand<
  T extends BotCommandConstructor | BotSubcommandConstructor = BotCommandConstructor | BotSubcommandConstructor,
  B extends Bot = Bot,
> extends createCommandMixin() {
  public abstract runDiscord(context: DiscordCommandContext<T>, ...args: unknown[]): Awaitable<void>
  public abstract runTelegram(context: MessageContext<B>, ...args: unknown[]): Awaitable<void>
}

abstract class BaseBotSubcommand<
  T extends BotSubcommandConstructor = BotSubcommandConstructor,
  B extends Bot = Bot,
> extends createSubcommandMixin() {
  public abstract runDiscord(context: DiscordCommandContext<T>, ...args: unknown[]): Awaitable<void>
  public abstract runTelegram(context: MessageContext<B>, ...args: unknown[]): Awaitable<void>
}

export abstract class BotCommand<
  T extends BotCommandConstructor = BotCommandConstructor,
  B extends Bot = Bot,
> extends BaseBotCommand<T, B> {}

export abstract class BotSubcommand<
  T extends BotSubcommandConstructor = BotSubcommandConstructor,
  B extends Bot = Bot,
> extends BaseBotSubcommand<T, B> {}

export abstract class DiscordOnlyCommand<
  T extends BotCommandConstructor = BotCommandConstructor,
> extends createCommandMixin() {
  public abstract runDiscord(context: DiscordCommandContext<T>, ...args: unknown[]): Awaitable<void>
}

export abstract class DiscordOnlySubcommand<
  T extends BotSubcommandConstructor = BotSubcommandConstructor,
> extends createSubcommandMixin() {
  public abstract runDiscord(context: DiscordCommandContext<T>, ...args: unknown[]): Awaitable<void>
}

export abstract class TelegramOnlyCommand<B extends Bot = Bot> {
  public abstract runTelegram(context: MessageContext<B>, ...args: unknown[]): Awaitable<void>
}
