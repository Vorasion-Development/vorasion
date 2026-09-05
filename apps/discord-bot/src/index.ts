import '@vorasion/types'
// Sapphire Plugins
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

import './prepare-container'
import './registry-behavior'

const basePath = path.join(__dirname)

const client = new SapphireClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
  i18n: {
    defaultLanguageDirectory: path.join(basePath, 'locales'),
  },
  tasks: {
    bull: {
      connection: {
        url: env.REDIS_URL,
      },
    },
  },
  baseUserDirectory: basePath,
})

client.login(env.TOKEN).catch((error) => {
  client.logger.fatal(error)
  process.exit(1)
})
