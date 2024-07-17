import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import axios from 'axios';
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
    const response = await axios.get(`https://api.mcstatus.io/v2/status/java/${mcServerIp}`);
    if (response.status === 200) {
      const playersOnline = response.data.players.online;
      await client.user?.setPresence({
        status: 'online',
        activities: [{
          name: `Игроков онлайн: ${playersOnline}`,
          type: ActivityType.Watching
        }]
      });
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
}

client.login(process.env.DISCORD_BOT_TOKEN);
