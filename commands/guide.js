const {
  ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('guide')
    .setDescription('Replies with a guide!'),
  async execute(interaction) {
    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('primary')
          .setLabel('Click me!')
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setLabel('Github Repo')
          .setURL('https://github.com/RVCC-IDMX/discord-bot-ricardopina')
          .setStyle(ButtonStyle.Link),
      );

    await interaction.reply({ content: 'Click the link below to read Sir Ricardo Servesalot\'s guide!', components: [row] });
  },
};
