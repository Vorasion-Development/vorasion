import { env } from '@vorasion/env'

declare module '@sapphire/pieces' {
  interface Container {
      env: typeof env
  }
}