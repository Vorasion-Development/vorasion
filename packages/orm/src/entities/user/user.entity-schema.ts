import { Cascade, defineEntity, p } from '@mikro-orm/core'

import { AccountEntity } from '../account.entity'
import { UserBalance, UserBio, UserCharacter, UserStomach } from './relation-imports'

export const UserSchema = defineEntity({
  name: 'User',
  extends: AccountEntity,
  tableName: 'users',
  properties: {
    level: p.integer().default(1),
    experience: p.integer().default(0),
    /**
     * Whether this user has gotten close to their limit during blackjack or not.
     */
    doubleBonesActive: p.boolean().name('double_bones_active').default(false),
    hasDoneTutorial: p.boolean().name('has_done_tutorial').default(false),
    /**
     * Whether the user was swallowed whole and alive and is currently
     * in someone's gurgling gut right now. Or if they're still out and about.
     */
    isInStomach: p.boolean().name('is_in_stomach').default(false),
    /**
     * The Discord ID of the user that swallowed this user, if there is one.
     */
    captorId: p.string().name('captor_id').nullable().default(null),
    activeCharacterId: p.string().name('active_character_id'),
    balance: () => p.oneToOne(UserBalance).cascade(Cascade.ALL).owner(),
    bio: () => p.oneToOne(UserBio).cascade(Cascade.ALL).owner(),
    characters: () => p.oneToMany(UserCharacter).cascade(Cascade.ALL).mappedBy('owner'),
    stomach: () => p.oneToOne(UserStomach).cascade(Cascade.ALL).owner(),
  },
  checks: [
    {
      expression: (columns) => `${columns.level} >= 1`,
      name: 'const_level_valid',
    },
    {
      expression: (columns) => `${columns.experience} >= 0`,
      name: 'const_experience_valid',
    },
  ],
  indexes: [{ properties: ['level'] }, { properties: ['experience'] }, { properties: ['captorId'] }],
})
