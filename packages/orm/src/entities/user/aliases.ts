import { User } from './user.entity'

export class DiscordUser extends User {
  constructor(discordId: string) {
    super(discordId)
  }
}

export class TelegramUser extends User {
  constructor(telegramId: string) {
    super(undefined, telegramId)
  }
}
