import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import { config } from 'dotenv';

config();

function validateEnv(): { token: string; serverIp: string } {
  const token = process.env.DISCORD_BOT_TOKEN;
  const serverIp = process.env.MC_SERVER_IP;
  if (!token) throw new Error('DISCORD_BOT_TOKEN is not set in .env');
  if (!serverIp) throw new Error('MC_SERVER_IP is not set in .env');
  return { token, serverIp };
}

const { token, serverIp } = validateEnv();

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

let statusInterval: ReturnType<typeof setInterval> | null = null;

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
  if (statusInterval) clearInterval(statusInterval);
  updateStatus();
  statusInterval = setInterval(updateStatus, 300000);
});

export async function fetchPlayerCount(ip: string): Promise<number | null> {
  const response = await fetch(`https://api.mcstatus.io/v2/status/java/${ip}`);
  if (!response.ok) return null;
  const data = await response.json() as { players: { online: number } };
  return data.players.online;
}

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
