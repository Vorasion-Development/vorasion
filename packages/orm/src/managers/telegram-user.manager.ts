import type { FindOptions, FindOneOptions, FindOneOrFailOptions } from '@mikro-orm/core'

import type { TelegramUser } from '../entities/user/user.entity'
import { type EntityUpdate, type EntityUpdateWithPaths, OrmManager } from './abstract-manager'

type UserUpdate = EntityUpdate<TelegramUser>
type UserUpdateWithPaths = EntityUpdateWithPaths<TelegramUser>

export class TelegramUserManager extends OrmManager<typeof TelegramUser, 'telegramId'> {
  public override async create(telegramId: string) {
    if (!telegramId) throw new Error('Telegram ID is required to create a Telegram user.')

    const em = this.getNewEm()
    const entity = new this.entity(telegramId)

    await em.persist(entity).flush()

    return entity
  }

  public override async getOne<T extends string>(telegramId: T, options?: FindOneOptions<TelegramUser>) {
    const em = this.getNewEm()
    return em.findOne(this.entity, { telegramId }, options)
  }

  public override async getOneOrFail<T extends string>(telegramId: T, options?: FindOneOrFailOptions<TelegramUser>) {
    const em = this.getNewEm()
    return em.findOneOrFail(this.entity, { telegramId }, options)
  }

  public override async getMany<T extends string>(telegramIds: T[], options?: FindOptions<TelegramUser>) {
    const em = this.getNewEm()
    return em.find(this.entity, { telegramId: { $in: telegramIds } }, options)
  }

  public override async update(entity: TelegramUser, values: UserUpdate | UserUpdateWithPaths) {
    const em = this.getNewEm()
    em.assign(entity, this.normalizePathUpdates(values))
    await em.flush()

    return entity
  }

  public override async delete<T extends string>(telegramId: T) {
    const em = this.getNewEm()
    const entity = await em.findOneOrFail(this.entity, { telegramId })
    await em.remove(entity).flush()
  }

  public override async deleteLoaded(entity: TelegramUser) {
    const em = this.getNewEm()
    await em.remove(entity).flush()
  }

  public override async exists<T extends string>(telegramId: T) {
    const em = this.getNewEm()
    return (await em.count(this.entity, { telegramId })) > 0
  }
}
