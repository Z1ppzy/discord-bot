import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import { config } from 'dotenv';

config();

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

const mcServerIp = process.env.MC_SERVER_IP || '';

client.on('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
  updateStatus();
  setInterval(updateStatus, 300000);
});

async function updateStatus() {
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${mcServerIp}`);
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

client.login(process.env.DISCORD_BOT_TOKEN);
