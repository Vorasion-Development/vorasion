import { Events, Listener } from '@sapphire/framework'
import { ApplyOptions } from '@vorasion/decorators'

@ApplyOptions<Listener.Options>({
  event: Events.ChatInputCommandDenied,
})
export class ChatInputCommandDeniedListener extends Listener<typeof Events.ChatInputCommandDenied> {
  public override run() {
    this.container.logger.info(`The ${String(this.event)} event has been emitted!`)
  }
}
