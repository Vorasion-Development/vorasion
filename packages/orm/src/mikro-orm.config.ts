import { Migrator } from '@mikro-orm/migrations'
import { defineConfig } from '@mikro-orm/postgresql'
import { SeedManager } from '@mikro-orm/seeder'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'
import env from '@vorasion/env'

const isDevelopment = env.NODE_ENV === 'development'

export default defineConfig({
  clientUrl: env.DATABASE_URL,
  debug: isDevelopment,
  entities: ['./dist/entities/**/*.entity.{js,mjs}'],
  entitiesTs: ['./src/entities/**/*.entity.{ts,mts}'],
  extensions: [Migrator, SeedManager],
  highlighter: isDevelopment ? new SqlHighlighter() : undefined,
})
