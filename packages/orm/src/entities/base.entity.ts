import { type Collection, defineEntity, p, raw, wrap } from '@mikro-orm/core'

const BaseEntitySchema = defineEntity({
  name: 'BaseEntity',
  abstract: true,
  properties: {
    id: p.integer().primary(),
    /**
     * When this entity was created
     */
    createdAt: p
      .datetime()
      .name('created_at')
      .onCreate(() => new Date())
      .default(raw('now()')),
    /**
     * When this entity was last updated
     */
    updatedAt: p
      .datetime()
      .name('updated_at')
      .onUpdate(() => new Date())
      .default(raw('now()')),
  },
  indexes: [{ properties: ['createdAt'] }, { properties: ['updatedAt'] }],
})

export abstract class BaseEntity extends BaseEntitySchema.class {
  public nullReturner = () => null

  constructor() {
    super()
  }

  public async loadCollection<E extends this, O extends object = object>(
    collection: Collection<E, O>,
    isLoadedFully: boolean = false,
  ) {
    return collection.isInitialized(isLoadedFully) ? collection.load() : collection.init()
  }

  public wrapEntity<T extends this>(entity: T) {
    return wrap(entity)
  }

  public entityIsInitialized<T extends this>(entity: T) {
    return this.wrapEntity(entity).isInitialized()
  }

  public async initializeEntity<T extends this>(entity: T): Promise<T> {
    if (this.entityIsInitialized(entity)) return entity

    const initializedEntity = await this.wrapEntity(entity).init()

    if (!initializedEntity) throw new Error('Failed to initialize entity.')

    return initializedEntity
  }
}

BaseEntitySchema.setClass(BaseEntity)
