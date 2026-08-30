import { BotSubcommand } from '../abstracts'
import type { CommandInteraction, BotSubcommandConstructor } from '../types'

export class PingSubcommand extends BotSubcommand {
  public async run(interaction: CommandInteraction<BotSubcommandConstructor>) {
    await interaction.deferReply()
  }
}
