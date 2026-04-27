import { Client, GatewayIntentBits, ActivityType, REST, Routes, ChatInputCommandInteraction } from 'discord.js';
import { config } from 'dotenv';
import { fetchPlayerCount } from './minecraft';
import * as infoCommand from './commands/info';

config();

function validateEnv(): { token: string; serverIp: string; clientId: string } {
  const token = process.env.DISCORD_BOT_TOKEN;
  const serverIp = process.env.MC_SERVER_IP;
  const clientId = process.env.DISCORD_CLIENT_ID;
  if (!token) throw new Error('DISCORD_BOT_TOKEN is not set in .env');
  if (!serverIp) throw new Error('MC_SERVER_IP is not set in .env');
  if (!clientId) throw new Error('DISCORD_CLIENT_ID is not set in .env');
  return { token, serverIp, clientId };
}

const { token, serverIp, clientId } = validateEnv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let statusInterval: ReturnType<typeof setInterval> | null = null;

client.on('clientReady', async () => {
  console.log(`Logged in as ${client.user?.tag}`);

  const rest = new REST().setToken(token);
  await rest.put(Routes.applicationCommands(clientId), {
    body: [infoCommand.data.toJSON()],
  });
  console.log('Slash commands registered');

  if (statusInterval) clearInterval(statusInterval);
  updateStatus();
  statusInterval = setInterval(updateStatus, 300000);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'info') {
    await infoCommand.execute(interaction as ChatInputCommandInteraction);
  }
});

async function updateStatus() {
  try {
    const online = await fetchPlayerCount(serverIp);
    await client.user?.setPresence({
      status: 'online',
      activities: [{
        name: online !== null ? `Игроков онлайн: ${online}` : 'Сервер недоступен',
        type: ActivityType.Watching
      }]
    });
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

client.login(token);
