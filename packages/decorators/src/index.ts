export * from '@sapphire/decorators'
export * from './command-mixin'

import { createClassDecorator } from '@sapphire/decorators'
import type { ApplicationCommandRegistryRegisterOptions } from '@sapphire/framework'
import type { Constructor } from '@sapphire/utilities'

import { addOptionsToBuilder, addSubcommandGroupToBuilder, addSubcommandToBuilder, getRegistry } from './helpers'
import type { CommandOptions } from './types'

const defaultDescription = 'No description provided.'

export const ChatInputCommand = (
  options: CommandOptions,
  registerOptions?: ApplicationCommandRegistryRegisterOptions,
): ClassDecorator =>
  createClassDecorator((constructor: Constructor<any>) => {
    const { name, description, slashOptions, subcommands = [] } = options

    if (!name) throw new Error('Command name is required to use this decorator.')

    for (const subcommand of subcommands) {
      if (!subcommand.name) throw new Error('Subcommand name is required to register a subcommand or subcommand group.')

      const { groupSubcommands = [] } = subcommand

      for (const groupSubcommand of groupSubcommands) {
        if (!groupSubcommand.name) throw new Error('Group subcommand name is required to register a group subcommand.')
      }
    }

    const registry = getRegistry(name)

    registry.registerChatInputCommand((builder) => {
      builder.setName(name).setDescription(description ?? defaultDescription)
      addOptionsToBuilder(builder, slashOptions)

      for (const subcommand of subcommands) {
        const { groupSubcommands = [] } = subcommand

        if (groupSubcommands.length > 0) {
          for (const groupSubcommand of groupSubcommands) {
            addSubcommandGroupToBuilder(builder, groupSubcommand)
          }
        } else {
          addSubcommandToBuilder(builder, subcommand)
        }
      }

      return builder
    }, registerOptions)

    return constructor
  })
