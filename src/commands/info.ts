import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('info')
  .setDescription('Информация о сервере HeavenlyWeiner');

export async function execute(interaction: ChatInputCommandInteraction) {
  const embed = new EmbedBuilder()
    .setTitle('HeavenlyWeiner')
    .setColor(0x5865f2)
    .addFields(
      { name: '🌐 Сайт', value: '[heavenlyweiner.ru](http://heavenlyweiner.ru)' },
      { name: '💎 Донат', value: '[donate.heavenlyweiner.ru](http://donate.heavenlyweiner.ru)' },
    )
    .setFooter({ text: 'HeavenlyWeiner Minecraft Server' });

  await interaction.reply({ embeds: [embed] });
}
