/* eslint-disable no-restricted-syntax */
const fs = require('node:fs');
const path = require('node:path');
const {
  Client, Collection, Events, GatewayIntentBits, EmbedBuilder,
} = require('discord.js');

const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'));

const embed = new EmbedBuilder()
  .setTitle('Commands:')
  .setColor(0x0099FF)
  .setAuthor({ name: 'Ricardo Pina', iconURL: 'https://i.imgur.com/zMc19jb.png', url: 'https://discordapp.com/users/505573810804752394' })
  .setDescription('To view all of the command options, you can type / on the message bar.')
  .setThumbnail('https://i.imgur.com/4IQbsx4.png');

let embedCount = 0;

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.once(Events.ClientReady, () => {
  console.log('Ready!');
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.customId === 'primary') {
    embedCount += 1;
    console.log(`Printed embed ${embedCount} time(s)`);
    await interaction.reply({ embeds: [embed] });
  }
  const command = client.commands.get(interaction.commandName);

  if (!interaction.isChatInputCommand()) return;

  if (!command) return;


  try {
    await command.execute(interaction);
  }
  catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});


client.login(token);
