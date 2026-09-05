import type { Bot, MessageContext } from 'gramio'

import { TelegramOnlyCommand } from '../abstracts'

export class IdCommand<B extends Bot = Bot> extends TelegramOnlyCommand<B> {
  public async runTelegram(context: MessageContext<B>) {
    const sender = context.from

    if (!sender) {
      await context.reply('Could not retrieve your user ID.')
      return
    }

    const userId = sender.id

    await context.reply(
      <>
        <b>Your User ID is:</b> {userId}
      </>,
      {
        reply_markup: (
          <keyboard inline>
            <row>
              <button copyText={userId.toString()}>Copy ID</button>
            </row>
          </keyboard>
        ),
      },
    )
  }
}
