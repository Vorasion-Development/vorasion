import { ApplicationCommandRegistries } from '@sapphire/framework'

import type {
  AnySlashCommandBuilder,
  CommandOption,
  StringCommandOption,
  NumberCommandOption,
  BooleanCommandOption,
  UserCommandOption,
} from './types'

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
  builder.addBooleanOption((opt) =>
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false),
  )
}

function addUserOption(builder: AnySlashCommandBuilder, option: UserCommandOption) {
  builder.addUserOption((opt) =>
    opt
      .setName(option.name)
      .setDescription(option.description)
      .setRequired(option.required ?? false),
  )
}
