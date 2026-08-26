import { ApplyOptions } from '@sapphire/decorators'
import { Events, Listener } from '@sapphire/framework'

@ApplyOptions<Listener.Options>({})
export class ChatInputCommandDeniedListener extends Listener<typeof Events.ChatInputCommandDenied> {
  public run() {
    this.container.logger.info(`The ${String(this.event)} event has been emitted!`)
  }
}
