import { defineEntity, p } from '@mikro-orm/core'

import { BaseEntity } from '../../base.entity'
import { User } from '../user.entity'

export const UserBioSchema = defineEntity({
  name: 'UserBio',
  extends: BaseEntity,
  tableName: 'user_bios',
  properties: {
    user: () => p.oneToOne(User).mappedBy('bio'),
    content: p.string().length(80).default('A mysterious predator'),
  },
})
