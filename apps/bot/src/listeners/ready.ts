import { ApplyOptions } from '@sapphire/decorators'
import { Listener, type SapphireClient } from '@sapphire/framework'
import env from '@vorasion/env'
import { Events } from 'discord.js'

@ApplyOptions<Listener.Options>({
  event: Events.ClientReady,
})
export class ReadyListener extends Listener<typeof Events.ClientReady> {
  public override run(client: SapphireClient) {
    this.container.logger.info(`${client.user!.username} is online!`)
    this.container.env = env
  }
}
