import type { FindOptions, FindOneOptions, FindOneOrFailOptions } from '@mikro-orm/core'

import type { DiscordUser } from '../entities/user/user.entity'
import { type EntityUpdate, type EntityUpdateWithPaths, OrmManager } from './abstract-manager'

type UserUpdate = EntityUpdate<DiscordUser>
type UserUpdateWithPaths = EntityUpdateWithPaths<DiscordUser>

export class DiscordUserManager extends OrmManager<typeof DiscordUser, 'discordId'> {
  public override async create(discordId: string) {
    if (!discordId) throw new Error('Discord ID is required to create a Discord user.')

    const em = this.getNewEm()
    const entity = new this.entity(discordId)

    await em.persist(entity).flush()

    return entity
  }

  public override async getOne<T extends string>(discordId: T, options?: FindOneOptions<DiscordUser>) {
    const em = this.getNewEm()
    return em.findOne(this.entity, { discordId }, options)
  }

  public override async getOneOrFail<T extends string>(discordId: T, options?: FindOneOrFailOptions<DiscordUser>) {
    const em = this.getNewEm()
    return em.findOneOrFail(this.entity, { discordId }, options)
  }

  public override async getMany<T extends string>(discordIds: T[], options?: FindOptions<DiscordUser>) {
    const em = this.getNewEm()
    return em.find(this.entity, { discordId: { $in: discordIds } }, options)
  }

  public override async update(entity: DiscordUser, values: UserUpdate | UserUpdateWithPaths) {
    const em = this.getNewEm()
    em.assign(entity, this.normalizePathUpdates(values))
    await em.flush()

    return entity
  }

  public override async delete<T extends string>(discordId: T) {
    const em = this.getNewEm()
    const entity = await em.findOneOrFail(this.entity, { discordId })
    await em.remove(entity).flush()
  }

  public override async deleteLoaded(entity: DiscordUser) {
    const em = this.getNewEm()
    await em.remove(entity).flush()
  }

  public override async exists<T extends string>(discordId: T) {
    const em = this.getNewEm()
    return (await em.count(this.entity, { discordId })) > 0
  }
}
