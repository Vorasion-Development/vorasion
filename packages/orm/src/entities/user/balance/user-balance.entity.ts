import { UserBalanceSchema } from './user-balance.entity-schema'

export class UserBalance extends UserBalanceSchema.class {}

UserBalanceSchema.setClass(UserBalance)
