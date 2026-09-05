import { defineEntity, p } from '@mikro-orm/core'

import { BaseEntity } from '../../base.entity'
import { User } from '../user.entity'

export enum UserCharacterRole {
  Pred = 'pred',
  Prey = 'prey',
  Switch = 'switch',
}

export enum UserCharacterMeasurementSystem {
  Imperial = 'imperial',
  Metric = 'metric',
}

const defaultHeight = 12
const defaultWeight = 300
export const defaultBio = 'A mysterious yet intriguing character'

export const UserCharacterSchema = defineEntity({
  name: 'UserCharacter',
  extends: BaseEntity,
  tableName: 'user_characters',
  properties: {
    owner: () => p.manyToOne(User),
    characterId: p.string().name('character_id'),
    name: p.string().name('name'),
    species: p.string().name('species'),
    role: p.enum(() => UserCharacterRole).nativeEnumName('character_role'),
    bio: p.string().length(1_000).name('bio').default(defaultBio),
    height: p.integer().name('height').default(defaultHeight),
    initialHeight: p.integer().name('initial_height').default(defaultHeight),
    weight: p.integer().name('weight').default(defaultWeight),
    initialWeight: p.integer().name('initial_weight').default(defaultWeight),
    isPermad: p.boolean().name('is_permad').default(false),
    digestedBy: p.string().name('digested_by').nullable().default(null),
  },
  checks: [
    {
      expression: (columns) => `${columns.characterId} <> ''`,
      name: 'const_id_not_empty',
    },
    {
      expression: (columns) => `${columns.name} <> ''`,
      name: 'const_name_not_empty',
    },
    {
      expression: (columns) => `${columns.weight} >= 0`,
      name: 'const_weight_non_negative',
    },
    {
      expression: (columns) => `${columns.height} >= 0`,
      name: 'const_height_non_negative',
    },
  ],
  uniques: [{ properties: ['owner', 'characterId'] }],
})
