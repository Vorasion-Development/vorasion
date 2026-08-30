import { Listener, type SapphireClient } from '@sapphire/framework'
import { ApplyOptions } from '@vorasion/decorators'
import env from '@vorasion/env'
import { VorasionORM } from '@vorasion/orm'
import { Events } from 'discord.js'

import { uiClient } from '#root/uiConfig'

@ApplyOptions<Listener.Options>({
  event: Events.ClientReady,
})
export class ReadyListener extends Listener<typeof Events.ClientReady> {
  public override async run(client: SapphireClient<true>) {
    this.container.logger.info(`${client.user.username} is online!`)
    this.container.env = env
    this.container.orm = await VorasionORM.init(env.DATABASE_URL)
    this.container.ui = uiClient
  }
}
