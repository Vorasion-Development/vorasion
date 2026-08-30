import { UiClient } from '@vorasion-dev/discord-ui-kit'
import { env } from '@vorasion/env'
import { VorasionORM } from '@vorasion/orm'

declare module '@sapphire/pieces' {
  interface Container {
    env: typeof env
    orm: VorasionORM
    ui: UiClient
  }
}
