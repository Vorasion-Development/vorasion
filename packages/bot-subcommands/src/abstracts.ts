import { Command } from '@sapphire/framework'
import { Subcommand } from '@sapphire/plugin-subcommands'
import type { Awaitable } from '@sapphire/utilities'
import { createCommandMixin, createSubcommandMixin } from '@vorasion/decorators'

import type { BotCommandConstructor, BotSubcommandConstructor, CommandInteraction } from './types'

export abstract class BotCommand<T extends BotCommandConstructor = BotCommandConstructor> extends createCommandMixin(
  Command,
) {
  constructor() {
    super()
  }

  public abstract run(interaction: CommandInteraction<T>, ...args: unknown[]): Awaitable<void>
}

export abstract class BotSubcommand<
  T extends BotSubcommandConstructor = BotSubcommandConstructor,
> extends createSubcommandMixin(Subcommand) {
  constructor() {
    super()
  }

  public abstract run(interaction: CommandInteraction<T>, ...args: unknown[]): Awaitable<void>
}
