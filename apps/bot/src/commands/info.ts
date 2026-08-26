import { ApplyOptions } from '@sapphire/decorators'
import { Subcommand } from '@sapphire/plugin-subcommands'
import { ChatInputCommand, createSubcommandMixin } from '@vorasion/decorators'

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
export class InfoGroup extends createSubcommandMixin(Subcommand) {
  public async pingSubcommandRun(interaction: Subcommand.ChatInputCommandInteraction) {
    await interaction.reply({ content: 'Pong!' })
  }
}
