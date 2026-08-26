import { type Command, container } from '@sapphire/framework'
import type { PluginSubcommandCooldownPrecondition, Subcommand } from '@sapphire/plugin-subcommands'
import type { Constructor } from '@sapphire/utilities'

import type { CooldownPreconditionInstance } from './types'

const COMMAND_COOLDOWN_BUCKET_KEY = 'Cooldown'
const SUBCOMMAND_COOLDOWN_BUCKET_KEY = 'PluginSubcommandCooldown'

const baseMixin = <T extends Constructor<any>>(constructor: T) =>
  class extends constructor {
    private getPreconditionsStore() {
      return container.stores.get('preconditions')
    }

    protected getCommandCooldownBucket(instance: Command) {
      return (
        this.getPreconditionsStore().get(COMMAND_COOLDOWN_BUCKET_KEY) as CooldownPreconditionInstance
      ).buckets.get(instance)
    }

    protected getSubcommandCooldownBucket(instance: Subcommand) {
      return (
        this.getPreconditionsStore().get(SUBCOMMAND_COOLDOWN_BUCKET_KEY) as PluginSubcommandCooldownPrecondition
      ).subcommandBuckets.get(instance)
    }

    protected getCooldownKey(userId: string, instance: Command | Subcommand) {
      return `${userId}.${instance.name}`
    }
  }

export const createCommandMixin = (constructor: Constructor<Command>) =>
  class extends baseMixin(constructor) {
    public resetCooldown(interaction: Command.ChatInputCommandInteraction) {
      const manager = this.getCommandCooldownBucket(this)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this)
      manager.delete(key)
    }
  }

export const createSubcommandMixin = (constructor: Constructor<Subcommand>) =>
  class extends baseMixin(constructor) {
    public resetCooldown(interaction: Subcommand.ChatInputCommandInteraction) {
      const manager = this.getSubcommandCooldownBucket(this)

      if (!manager) return

      const key = this.getCooldownKey(interaction.user.id, this)
      manager.delete(key)
    }
  }
