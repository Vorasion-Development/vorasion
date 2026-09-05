export * from './entities'

import { MikroORM } from '@mikro-orm/core'

import { User } from './entities'
import { DiscordUserManager } from './managers/discord-user.manager'
import { TelegramUserManager } from './managers/telegram-user.manager'
import mikroOrmConfig from './mikro-orm.config'

export class VorasionORM {
  private readonly discordUserManager: DiscordUserManager
  private readonly telegramUserManager: TelegramUserManager

  private constructor(private readonly orm: MikroORM) {
    this.discordUserManager = new DiscordUserManager(orm, User)
    this.telegramUserManager = new TelegramUserManager(orm, User)
  }

  public static async init(clientUrl: string): Promise<VorasionORM> {
    const instance = await MikroORM.init({
      ...mikroOrmConfig,
      clientUrl,
    })
    await instance.connect()
    return new VorasionORM(instance)
  }

  public get mikro() {
    return this.orm
  }

  public get discordUsers() {
    return this.discordUserManager
  }

  public get telegramUsers() {
    return this.telegramUserManager
  }

  public async disconnect(force: boolean = false) {
    await this.orm.close(force)
  }
}
