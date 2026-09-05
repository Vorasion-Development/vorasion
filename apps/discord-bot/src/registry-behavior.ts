import { ApplicationCommandRegistries, RegisterBehavior } from '@sapphire/framework'
import env from '@vorasion/env'

const { NODE_ENV, TEST_GUILD_ID } = env
const isDevelopment = NODE_ENV === 'development'

ApplicationCommandRegistries.setBulkOverwriteRetries(3)
ApplicationCommandRegistries.setDefaultBehaviorWhenNotIdentical(RegisterBehavior.BulkOverwrite)
ApplicationCommandRegistries.setDefaultGuildIds(isDevelopment && TEST_GUILD_ID ? [TEST_GUILD_ID] : null)
