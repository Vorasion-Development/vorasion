export * from '@sapphire/decorators'
export * from './command-mixin'

import { createClassDecorator } from '@sapphire/decorators'
import type { ApplicationCommandRegistryRegisterOptions, Command } from '@sapphire/framework'
import type { Constructor } from '@sapphire/utilities'

import { createCommandMixin } from './command-mixin'
import { addOptionsToBuilder, getRegistry } from './helpers'
import type { CommandOptions } from './types'

const defaultDescription = 'No description provided.'

export const ChatInputCommand = (
  options: CommandOptions,
  registerOptions?: ApplicationCommandRegistryRegisterOptions,
): ClassDecorator =>
  createClassDecorator((constructor: Constructor<Command>) => {
    const { name, description, slashOptions, subcommands = [] } = options

    if (!name) throw new Error('Command name is required to use this decorator.')

    for (const subcommand of subcommands) {
      if (!subcommand.name) throw new Error('Subcommand name is required to register a subcommand.')
    }

    const registry = getRegistry(name)

    registry.registerChatInputCommand((builder) => {
      builder.setName(name).setDescription(description ?? defaultDescription)
      addOptionsToBuilder(builder, slashOptions)

      for (const subcommand of subcommands) {
        const { name: subcommandName, description: subcommandDescription, slashOptions: subcommandOptions } = subcommand
        builder.addSubcommand((subBuilder) => {
          subBuilder.setName(subcommandName!).setDescription(subcommandDescription ?? defaultDescription)
          addOptionsToBuilder(subBuilder, subcommandOptions)
          return subBuilder
        })
      }

      return builder
    }, registerOptions)

    return createCommandMixin(constructor)
  })
