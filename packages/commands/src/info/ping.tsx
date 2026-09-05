import { Stopwatch } from '@sapphire/stopwatch'
import { stripIndents } from 'common-tags'
import type { Bot, MessageContext } from 'gramio'

import { BotSubcommand } from '../abstracts'
import type { DiscordCommandContext, BotSubcommandConstructor } from '../types'

export class PingCommand<
  B extends Bot = Bot,
  T extends BotSubcommandConstructor = BotSubcommandConstructor,
> extends BotSubcommand<T, B> {
  public async runDiscord({ container, interaction }: DiscordCommandContext<T>) {
    await interaction.deferReply()

    const stopwatch = this.createPingStopwatch()

    await interaction.editReply({
      content: 'Pinging...',
    })

    await interaction.fetchReply()

    const latency = stopwatch.stop().toString()

    const ping = interaction.client.ws.ping
    const embed = container.ui.embeds.info('Pong!', {
      description: stripIndents`
        Yep, I'm alive! Don't worry!
      `,
      fields: [
        {
          name: 'Message Round Trip',
          value: `\`${latency}\``,
          inline: true,
        },
        {
          name: 'WebSocket Ping',
          value: ping === -1 ? '`N/A`' : `\`${ping}ms\``,
          inline: true,
        },
      ],
    })

    await interaction.editReply({
      content: null,
      embeds: [embed],
    })
  }

  public async runTelegram(context: MessageContext<B>) {
    const stopwatch = this.createPingStopwatch()
    const message = await context.reply('Pinging...')
    stopwatch.stop()

    const latency = stopwatch.toString()

    await message.editText(
      <>
        Yep, I'm alive! Don't worry!
        <br />
        <br />
        <b>Message Round Trip:</b> {latency}
      </>,
    )
  }

  private createPingStopwatch() {
    return new Stopwatch().start()
  }
}
