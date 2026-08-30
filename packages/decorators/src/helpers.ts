import { ApplicationCommandRegistries } from '@sapphire/framework'

import type {
  AnySlashCommandBuilder,
  AnySubcommandAddableBuilder,
  CommandOption,
  StringCommandOption,
  NumberCommandOption,
  BooleanCommandOption,
  UserCommandOption,
  SubcommandOptions,
  SlashCommandBuilder,
} from './types'

export function addSubcommandToBuilder(builder: AnySubcommandAddableBuilder, subcommand: SubcommandOptions) {
  builder.addSubcommand((builder) => {
    const { name, description, slashOptions } = subcommand

    if (!name) throw new Error('Subcommand name is required to register a subcommand.')

    builder.setName(name).setDescription(description ?? 'No description provided.')
    addOptionsToBuilder(builder, slashOptions)
    return builder
  })
}

export function addSubcommandGroupToBuilder(builder: SlashCommandBuilder, subcommandGroup: SubcommandOptions) {
  builder.addSubcommandGroup((builder) => {
    const { name, description, groupSubcommands } = subcommandGroup

    if (!name) throw new Error('Subcommand group name is required to register a subcommand group.')
    if (!groupSubcommands || groupSubcommands.length === 0)
      throw new Error('Subcommand group must have at least one subcommand.')

    builder.setName(name).setDescription(description ?? 'No description provided.')

    for (const subcommand of groupSubcommands) {
      addSubcommandToBuilder(builder, subcommand)
    }

    return builder
  })
}

export function getRegistry(name: string) {
  return ApplicationCommandRegistries.acquire(name)
}

export function addOptionsToBuilder(builder: AnySlashCommandBuilder, options: CommandOption[] = []) {
  for (const option of options) {
    switch (option.type) {
      case 'string':
        addStringOption(builder, option)
        break
      case 'number':
        addNumberOption(builder, option)
        break
      case 'boolean':
        addBooleanOption(builder, option)
        break
      case 'user':
        addUserOption(builder, option)
        break
      default:
        throw new Error(`Unknown option type received.`) // Apparently option is never here, soooo... can't have a better error message.
    }
  }
}

function addStringOption(builder: AnySlashCommandBuilder, option: StringCommandOption) {
  builder.addStringOption((opt) => {
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false)
    if (option.autocomplete) opt.setAutocomplete(true)
    if (option.choices) opt.addChoices(...option.choices.map((choice) => ({ name: choice.name, value: choice.value })))
    if (option.minLength !== undefined) opt.setMinLength(option.minLength)
    if (option.maxLength !== undefined) opt.setMaxLength(option.maxLength)
    return opt
  })
}

function addNumberOption(builder: AnySlashCommandBuilder, option: NumberCommandOption) {
  if (option.type !== 'number') return

  builder.addNumberOption((opt) => {
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false)
    if (option.choices) opt.addChoices(...option.choices.map((choice) => ({ name: choice.name, value: choice.value })))
    if (option.minValue !== undefined) opt.setMinValue(option.minValue)
    if (option.maxValue !== undefined) opt.setMaxValue(option.maxValue)
    return opt
  })
}

function addBooleanOption(builder: AnySlashCommandBuilder, option: BooleanCommandOption) {
  if (option.type !== 'boolean') return

  builder.addBooleanOption((opt) =>
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false),
  )
}

function addUserOption(builder: AnySlashCommandBuilder, option: UserCommandOption) {
  if (option.type !== 'user') return

  builder.addUserOption((opt) =>
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false),
  )
}
