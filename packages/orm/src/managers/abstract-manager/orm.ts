import type { FindOneOptions, FindOneOrFailOptions, FindOptions, MikroORM } from '@mikro-orm/core'
import type { Awaitable } from '@sapphire/utilities'

import { normalizePathUpdates } from '../manager-utilities'
import type {
  BaseEntityConstructor,
  Entity,
  LoadedEntity,
  NonFunctionNonCollectionKeys,
  NonNullableKeyValue,
  AnyEntityUpdate,
  EntityUpdate,
} from './types'

export abstract class OrmManager<
  C extends BaseEntityConstructor,
  K extends NonFunctionNonCollectionKeys<Entity<C>>,
  MaxUpdateDepth extends number = 2,
> {
  constructor(
    protected readonly orm: MikroORM,
    protected readonly entity: C,
  ) {}

  public abstract create(...args: ConstructorParameters<C>): Awaitable<Entity<C>>
  public abstract getOne<T extends NonNullableKeyValue<C, K>>(
    value: T,
    options?: FindOneOptions<Entity<C>>,
  ): Awaitable<LoadedEntity<C> | null>
  public abstract getOneOrFail<T extends NonNullableKeyValue<C, K>>(
    value: T,
    options?: FindOneOrFailOptions<Entity<C>>,
  ): Awaitable<LoadedEntity<C>>
  public abstract getMany<T extends NonNullableKeyValue<C, K>>(
    values: T[],
    options?: FindOptions<Entity<C>>,
  ): Awaitable<LoadedEntity<C>[]>
  public abstract update(
    entity: LoadedEntity<C>,
    values: AnyEntityUpdate<Entity<C>, MaxUpdateDepth>,
  ): Awaitable<LoadedEntity<C>>
  public abstract delete<T extends NonNullableKeyValue<C, K>>(value: T): Awaitable<void>
  public abstract deleteLoaded(entity: LoadedEntity<C>): Awaitable<void>
  public abstract exists<T extends NonNullableKeyValue<C, K>>(value: T): Awaitable<boolean>

  protected getNewEm() {
    return this.orm.em.fork()
  }

  protected normalizePathUpdates(values: AnyEntityUpdate<Entity<C>, MaxUpdateDepth>): EntityUpdate<Entity<C>> {
    return normalizePathUpdates(values)
  }
}
