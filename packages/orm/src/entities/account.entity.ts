import { defineEntity, p } from '@mikro-orm/core'

import { BaseEntity } from './base.entity'

const AccountEntitySchema = defineEntity({
  name: 'AccountEntity',
  extends: BaseEntity,
  abstract: true,
  properties: {
    discordId: p.string().name('discord_id').unique().nullable().default(null),
    telegramId: p.string().name('telegram_id').unique().nullable().default(null),
  },
  checks: [
    {
      expression: (columns) => `${columns.discordId} IS NOT NULL OR ${columns.telegramId} IS NOT NULL`,
      name: 'const_discord_or_telegram_id_not_null',
    },
  ],
  indexes: [{ properties: ['discordId'] }, { properties: ['telegramId'] }],
})

export abstract class AccountEntity extends AccountEntitySchema.class {
  constructor(discordId?: string, telegramId?: string) {
    super()

    const trimmedDiscordId = discordId?.trim()
    const trimmedTelegramId = telegramId?.trim()

    const discordIdLength = trimmedDiscordId?.length ?? 0
    const telegramIdLength = trimmedTelegramId?.length ?? 0

    if (discordIdLength === 0 && telegramIdLength === 0)
      throw new Error('Either discordId or telegramId must be provided to create an AccountEntity.')

    if (discordIdLength > 0) this.discordId = trimmedDiscordId
    if (telegramIdLength > 0) this.telegramId = trimmedTelegramId
  }
}

AccountEntitySchema.setClass(AccountEntity)
