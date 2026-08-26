import arkenv from 'arkenv'

export const env = arkenv({
  NODE_ENV: '"development" |"production" | "test" = "development"',
  TOKEN: 'string',
  DATABASE_URL: 'string.url',
  REDIS_URL: 'string.url',
  CLIENT_ID: 'string',
  CLIENT_SECRET: 'string',
  AUTH_CALLBACK_URL: 'string.url = "http://127.0.0.1"',
  'TEST_GUILD_IDS?': 'string[]',
})

export default env
