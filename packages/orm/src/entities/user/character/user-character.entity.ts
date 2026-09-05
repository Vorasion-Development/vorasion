export { UserCharacterMeasurementSystem, UserCharacterRole } from './user-character.entity-schema'

import { kebabCase } from 'change-case'

import type { User } from '../user.entity'
import { defaultBio, UserCharacterRole, UserCharacterSchema } from './user-character.entity-schema'

export class UserCharacter extends UserCharacterSchema.class {
  constructor(owner: User, name: string, species: string, role: UserCharacterRole, bio?: string) {
    super()

    this.owner = owner
    this.characterId = kebabCase(name)
    this.name = name
    this.species = species
    this.bio = bio ?? defaultBio
    this.role = role
  }

  /**
   * Sets this character as permavored.
   * @param predator The predator that digested this character
   */
  public setPermavored(predator: string) {
    this.isPermad = true
    this.digestedBy = predator
    // this.owner.settings.permavoreModeOn = false
  }
}

UserCharacterSchema.setClass(UserCharacter)
