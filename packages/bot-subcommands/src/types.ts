import type { Command } from '@sapphire/framework'
import type { Subcommand } from '@sapphire/plugin-subcommands'
import { createCommandMixin, createSubcommandMixin } from '@vorasion/decorators'

// This is because TypeScript needs a discriminant to differentiate between the two types,
// and using a unique symbol as a brand allows us to do that. Otherwise we get Command.ChatInputCommandInteraction every single time.
declare const botCommandBrand: unique symbol
declare const botSubcommandBrand: unique symbol

export type BotCommandConstructor = ReturnType<typeof createCommandMixin> & {
  readonly [botCommandBrand]: true
}
export type BotSubcommandConstructor = ReturnType<typeof createSubcommandMixin> & {
  readonly [botSubcommandBrand]: true
}
export type CommandInteraction<T extends BotCommandConstructor | BotSubcommandConstructor> =
  T extends BotCommandConstructor
    ? Command.ChatInputCommandInteraction
    : T extends BotSubcommandConstructor
      ? Subcommand.ChatInputCommandInteraction
      : never
