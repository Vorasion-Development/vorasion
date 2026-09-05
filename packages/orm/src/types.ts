import type { UserCharacterRole } from './entities/user/character/user-character.entity-schema'

export type PartialCharacter = {
  name: string
  species: string
  role: UserCharacterRole
  bio?: string
}
