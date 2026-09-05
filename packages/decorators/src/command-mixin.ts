// TODO: Clean this shit up, it looks like my appendix after it bursts.
import { type Command, container } from '@sapphire/framework'
import type { PluginSubcommandCooldownPrecondition, Subcommand } from '@sapphire/plugin-subcommands'
import type { Constructor } from '@sapphire/utilities'

import type { CooldownPreconditionInstance } from './types'

const COMMAND_COOLDOWN_BUCKET_KEY = 'Cooldown'
const SUBCOMMAND_COOLDOWN_BUCKET_KEY = 'PluginSubcommandCooldown'

const baseMixin = <C extends Command | Subcommand>() => {
  return class {
    private getPreconditionsStore() {
      return container.stores.get('preconditions')
    }

    protected getCommandCooldownBucket(instance: Command) {
      const precondition = this.getPreconditionsStore().get(COMMAND_COOLDOWN_BUCKET_KEY) as
        | CooldownPreconditionInstance
        | undefined

      if (!precondition) return undefined

      return precondition.buckets.get(instance)
    }

    protected getSubcommandCooldownBucket(instance: Subcommand) {
      const precondition = this.getPreconditionsStore().get(SUBCOMMAND_COOLDOWN_BUCKET_KEY) as
        | PluginSubcommandCooldownPrecondition
        | undefined

      if (!precondition) return undefined

      return precondition.subcommandBuckets.get(instance)
    }

    protected getCooldownKey(userId: string, instance: C) {
      return `${userId}.${instance.name}`
    }
  }
}

const baseExtensionMixin = <C extends Command | Subcommand, T extends Constructor<any>>(constructor: T) =>
  class extends constructor {
    private getPreconditionsStore() {
      return container.stores.get('preconditions')
    }

    protected getCommandCooldownBucket(instance: Command) {
      const precondition = this.getPreconditionsStore().get(COMMAND_COOLDOWN_BUCKET_KEY) as
        | CooldownPreconditionInstance
        | undefined

      if (!precondition) return undefined

      return precondition.buckets.get(instance)
    }

    protected getSubcommandCooldownBucket(instance: Subcommand) {
      const precondition = this.getPreconditionsStore().get(SUBCOMMAND_COOLDOWN_BUCKET_KEY) as
        | PluginSubcommandCooldownPrecondition
        | undefined

      if (!precondition) return undefined

      return precondition.subcommandBuckets.get(instance)
    }

    protected getCooldownKey(userId: string, instance: C) {
      return `${userId}.${instance.name}`
    }
  }

export const createCommandMixin = () =>
  class extends baseMixin<Command>() {
    constructor(private instance?: Command) {
      super()
    }

    public resetCooldown(interaction: Command.ChatInputCommandInteraction) {
      if (!this.instance) throw new Error('Command instance is not defined.')

      const manager = this.getCommandCooldownBucket(this.instance)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this.instance)
      manager.delete(key)
    }
  }

export const createCommandExtensionMixin = <T extends Constructor<Command>>(constructor: T) =>
  class extends baseExtensionMixin<Command, T>(constructor) {
    constructor(...args: any[]) {
      super(...args)
    }

    public resetCooldown(interaction: Command.ChatInputCommandInteraction) {
      const manager = this.getCommandCooldownBucket(this)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this)
      manager.delete(key)
    }
  }

export const createSubcommandMixin = () =>
  class extends baseMixin<Subcommand>() {
    constructor(private instance?: Subcommand) {
      super()
    }

    public resetCooldown(interaction: Subcommand.ChatInputCommandInteraction) {
      if (!this.instance) throw new Error('Subcommand instance is not defined.')

      const manager = this.getSubcommandCooldownBucket(this.instance)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this.instance)
      manager.delete(key)
    }
  }

export const createSubcommandExtensionMixin = <T extends Constructor<Subcommand>>(constructor: T) =>
  class extends baseExtensionMixin<Subcommand, T>(constructor) {
    constructor(...args: any[]) {
      super(...args)
    }

    public resetCooldown(interaction: Subcommand.ChatInputCommandInteraction) {
      const manager = this.getSubcommandCooldownBucket(this)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this)
      manager.delete(key)
    }
  }
