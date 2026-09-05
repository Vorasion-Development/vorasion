import { Command, type CorePreconditions } from '@sapphire/framework'
import type { SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandGroupBuilder } from 'discord.js'

export { SlashCommandBuilder } from 'discord.js'

interface CommandOptionBase {
  name: string
  description: string
  required?: boolean
}

interface AutocompleteCommandOptionBase extends CommandOptionBase {
  autocomplete?: boolean
}

export interface StringCommandOption extends AutocompleteCommandOptionBase {
  type: 'string'
  choices?: { name: string; value: string }[]
  minLength?: number
  maxLength?: number
}

export interface NumberCommandOption extends AutocompleteCommandOptionBase {
  type: 'number'
  choices?: { name: string; value: number }[]
  minValue?: number
  maxValue?: number
}

export interface BooleanCommandOption extends CommandOptionBase {
  type: 'boolean'
}

export interface UserCommandOption extends CommandOptionBase {
  type: 'user'
}

export type CommandOption = StringCommandOption | NumberCommandOption | BooleanCommandOption | UserCommandOption

export type AnySlashCommandBuilder = SlashCommandBuilder | SlashCommandSubcommandBuilder

export type AnySubcommandAddableBuilder = SlashCommandBuilder | SlashCommandSubcommandGroupBuilder

export type CooldownPreconditionInstance = (typeof CorePreconditions)['Cooldown']['prototype']

export interface BaseCommandOptions extends Command.Options {
  slashOptions?: CommandOption[]
}

export interface CommandOptions extends BaseCommandOptions {
  subcommands?: SubcommandOptions[]
}

export interface SubcommandOptions extends BaseCommandOptions {
  groupSubcommands?: SubcommandOptionsWithGroup[]
}

export interface SubcommandOptionsWithGroup extends Omit<SubcommandOptions, 'groupSubcommands'> {}
