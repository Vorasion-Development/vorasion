import { Listener, type SapphireClient } from '@sapphire/framework'
import { ApplyOptions } from '@vorasion/decorators'
import { Events } from 'discord.js'

@ApplyOptions<Listener.Options>({
  event: Events.ClientReady,
})
export class ReadyListener extends Listener<typeof Events.ClientReady> {
  public override async run(client: SapphireClient<true>) {
    this.container.logger.info(`${client.user.username} is online!`)
  }
}
