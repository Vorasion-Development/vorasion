export * from './aliases'
export { UserCharacterMeasurementSystem, UserCharacterRole } from './relation-imports'

import { Collection } from '@mikro-orm/core'

import { UserBalance, UserBio, UserCharacter, UserStomach } from './relation-imports'
import { UserSchema } from './user.entity-schema'

export class User extends UserSchema.class {
  constructor(discordId?: string, telegramId?: string) {
    super(discordId, telegramId)

    this.balance = new UserBalance()
    this.bio = new UserBio()
    this.characters = new Collection<UserCharacter>(this)
    this.stomach = new UserStomach()
  }

  public getBalance() {
    return this.initializeEntity(this.balance)
  }

  public getBio() {
    return this.initializeEntity(this.bio)
  }

  public getCharacters() {
    return this.loadCollection(this.characters)
  }

  public getStomach() {
    return this.initializeEntity(this.stomach)
  }
}

UserSchema.setClass(User)
