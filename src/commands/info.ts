import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Информация о сервере HeavenlyWeiner');

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle('🌿 HeavenlyWeiner')
    .setDescription('Добро пожаловать на HeavenlyWeiner — уютный Minecraft сервер для своих.')
    .setColor(0x57f287)
    .addFields(
      { name: '🌐 Сайт', value: '[heavenlyweiner.ru](http://heavenlyweiner.ru)', inline: true },
      { name: '💎 Донат', value: '[donate.heavenlyweiner.ru](http://donate.heavenlyweiner.ru)', inline: true },
      { name: '📢 Telegram', value: '[t.me/heavenlyweiner](https://t.me/heavenlyweiner)', inline: true },
    )
    .setFooter({ text: 'HeavenlyWeiner • Minecraft Server' });

  await interaction.reply({ embeds: [embed] });
}
