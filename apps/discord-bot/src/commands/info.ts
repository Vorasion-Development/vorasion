import { Subcommand } from '@sapphire/plugin-subcommands'
import { PingCommand } from '@vorasion/commands'
import { ApplyOptions, ChatInputCommand, createSubcommandExtensionMixin } from '@vorasion/decorators'

@ApplyOptions<Subcommand.Options>({
  name: 'info',
  subcommands: [
    {
      name: 'ping',
      chatInputRun: 'pingSubcommandRun',
    },
  ],
})
@ChatInputCommand({
  name: 'info',
  description: 'A command group with subcommands',
  subcommands: [
    {
      name: 'ping',
      description: 'Check if the bot is alive.',
    },
  ],
})
export class InfoGroup extends createSubcommandExtensionMixin(Subcommand) {
  public async pingSubcommandRun(interaction: Subcommand.ChatInputCommandInteraction) {
    await new PingCommand(this).runDiscord({ ...this, interaction })
  }
}
