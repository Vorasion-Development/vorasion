import './types/index.mts'
// Sapphire Plugins
import '@sapphire/plugin-api/register'
import '@sapphire/plugin-hmr/register'
import '@sapphire/plugin-i18next/register'
import '@sapphire/plugin-logger/register'
import '@sapphire/plugin-scheduled-tasks/register'
import '@sapphire/plugin-subcommands/register'
import '@sapphire/plugin-utilities-store/register'
// Node stuff
import path from 'node:path'

// Sapphire Framework
import { SapphireClient } from '@sapphire/framework'
import env from '@vorasion/env'
import { GatewayIntentBits } from 'discord.js'

import './registry-behavior'

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
  i18n: {
    defaultLanguageDirectory: path.join(__dirname, 'locales'),
  },
  tasks: {
    bull: {
      connection: {
        url: env.REDIS_URL,
      },
    },
  },
  baseUserDirectory: path.join(__dirname),
})

client.login(env.TOKEN).catch((error) => {
  client.logger.fatal(error)
  process.exit(1)
})
