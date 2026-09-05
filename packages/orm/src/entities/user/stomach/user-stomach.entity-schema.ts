import { defineEntity, p } from '@mikro-orm/core'

import { BaseEntity } from '../../base.entity.ts'
import { User } from '../user.entity.ts'

export const UserStomachSchema = defineEntity({
  name: 'UserStomach',
  extends: BaseEntity,
  tableName: 'user_stomachs',
  properties: {
    user: () => p.oneToOne(User).mappedBy('stomach'),
    capacity: p.bigint('number').name('capacity').default(1),
    currentSize: p.bigint('number').name('current_size').default(0),
    opponentsInside: p.array().name('opponents_inside').default<string[]>([]),
    usersInside: p.array().name('users_inside').default<string[]>([]),
    digestionTime: p.decimal('number').name('digestion_time').default(180),
  },
  checks: [
    {
      expression: (columns) => `${columns.capacity} > 0`,
      name: 'const_capacity_non_zero',
    },
    {
      expression: (columns) => `${columns.currentSize} <= ${columns.capacity}`,
      name: 'const_current_size_not_full',
    },
    {
      expression: (columns) => `${columns.currentSize} >= 0`,
      name: 'const_current_size_positive',
    },
  ],
  indexes: [{ properties: ['capacity'] }, { properties: ['currentSize'] }, { properties: ['digestionTime'] }],
})
