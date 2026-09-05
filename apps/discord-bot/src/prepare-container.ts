import { container } from '@sapphire/pieces'
import { env } from '@vorasion/env'
import { VorasionORM } from '@vorasion/orm'

import { uiClient } from './uiConfig'

container.env = env
container.orm = await VorasionORM.init(env.DATABASE_URL)
container.ui = uiClient
