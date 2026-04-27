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

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
  updateStatus();
  setInterval(updateStatus, 300000);
});

async function updateStatus() {
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${serverIp}`);
    if (!response.ok) return;
    const data = await response.json() as { players: { online: number } };
    await client.user?.setPresence({
      status: 'online',
      activities: [{
        name: `Игроков онлайн: ${data.players.online}`,
        type: ActivityType.Watching
      }]
    });
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

client.login(token);
