import type { Collection, Constructor, Loaded } from '@mikro-orm/core'

import type { BaseEntity } from '../../entities/base.entity'

export type BaseEntityConstructor = Constructor<BaseEntity>
export type Entity<C extends BaseEntityConstructor> = InstanceType<C>
export type LoadedEntity<C extends BaseEntityConstructor> = Loaded<Entity<C>>
export type EntityKey<C extends BaseEntityConstructor> = keyof Entity<C>
export type EntityKeyValue<C extends BaseEntityConstructor, K extends EntityKey<C>> = Entity<C>[K]
export type NonNullableKeyValue<C extends BaseEntityConstructor, K extends EntityKey<C>> = NonNullable<
  EntityKeyValue<C, K>
>

// Updating types, complex to allow optional nested updates like updating balance
// while excluding functions and collections from being updated directly.
export type NonFunctionNonCollectionKeys<T> = {
  [K in keyof T]: T[K] extends CallableFunction ? never : T[K] extends Collection<any> ? never : K
}[keyof T]
export type EntityUpdateType<T> = T extends BaseEntity ? EntityUpdate<T> : T

export type EntityUpdate<T extends BaseEntity> = {
  [K in NonFunctionNonCollectionKeys<T>]?: EntityUpdateType<T[K]>
}
export type EntityUpdateWithPaths<T extends BaseEntity, MaxDepth extends number = 2> = {
  [P in EntityPaths<T, MaxDepth>]?: EntityPathValue<T, P, MaxDepth>
}
export type AnyEntityUpdate<T extends BaseEntity, MaxDepth extends number = 2> =
  | EntityUpdate<T>
  | EntityUpdateWithPaths<T, MaxDepth>

//     WARNING: TYPESCRIPT HELL BELOW THIS COMMENT.      \\
// DO NOT DESCEND UNLESS YOU WANT YOUR BRAIN TO EXPLODE! \\

// This is why TypeScript is both hell and fun. God, I need a life.
export type EntityPaths<T, MaxDepth extends number = 2, Depth extends unknown[] = []> = Depth['length'] extends MaxDepth
  ? never
  : {
      [K in NonFunctionNonCollectionKeys<T> & string]: T[K] extends BaseEntity
        ? `${K}.${EntityPaths<T[K], MaxDepth, [...Depth, unknown]>}`
        : K
    }[NonFunctionNonCollectionKeys<T> & string]
export type EntityPathValue<T, P, MaxDepth extends number = 2> = P extends `${infer K}.${infer Rest}`
  ? K extends NonFunctionNonCollectionKeys<T>
    ? T[K] extends BaseEntity
      ? EntityPathValue<T[K], Rest & EntityPaths<T[K], MaxDepth>, MaxDepth>
      : never
    : never
  : P extends NonFunctionNonCollectionKeys<T>
    ? EntityUpdateType<T[P]>
    : never
