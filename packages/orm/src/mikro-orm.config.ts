import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'
import { SeedManager } from '@mikro-orm/seeder'
import env from '@vorasion/env'

export default defineConfig({
  clientUrl: env.DATABASE_URL,
  debug: env.NODE_ENV === 'development',
  entities: ['./dist/entities/**/*.entity.js'],
  entitiesTs: ['./src/entities/**/*.entity.ts'],
  extensions: [Migrator, SeedManager],
})
