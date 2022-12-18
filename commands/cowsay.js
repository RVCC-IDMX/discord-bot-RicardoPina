const { SlashCommandBuilder } = require('discord.js');
const cowsay = require('cowsay');

function get_cows(error, cow_names) {
  if (error) {
    console.log(error)
  }
  else if (cow_names) {
    console.log(`Number of cows available: ${cow_names.length}`);
  }
}

const cowList = cowsay.list(get_cows).then();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('cowsay')
    .setDescription('Replies with a cow!')
    .addStringOption((option) => option.setName('message')
      .setDescription('The message to print')
      .setMaxLength(199))
    .addStringOption((option) => option.setName('animal')
      .setDescription('choose the animal')
      .setRequired((false)))
    .addStringOption((option) => option.setName('eyes')
      .setDescription('design animal\'s eyes')
      .setRequired((false))
      .setMaxLength(3))
    .addStringOption((option) => option.setName('tongue')
      .setDescription('design animal\'s tongue')
      .setRequired((false))
      .setMaxLength(2))
    .addStringOption((option) => option.setName('mode')
      .setDescription('select animal\'s mode')
      .setRequired((false))
      .setMaxLength(1)),
  async execute(interaction) {

    const cow = {
      text: 'boo!',
      e: 'XX',
      T: 'U',
      cow: 'cat',
      mode: '',
    };

    if (!(interaction.options.getString('message') == undefined)) {
      cow.text = interaction.options.getString('message');
    }

    if (!(interaction.options.getString('eyes') == undefined)) {
      cow.e = interaction.options.getString('eyes');
    }

    if (!(interaction.options.getString('tongue') == undefined)) {
      cow.T = interaction.options.getString('tongue');
    }

    if (!(interaction.options.getString('animal') == undefined)) {
      cow.cow = interaction.options.getString('animal');
    }

    if (!(interaction.options.getString('mode') == undefined)) {
      cow.cow = interaction.options.getString('mode');
    }

    console.log((await cowList).includes('ackbar.cow'));
    // const cowContainer = cowsay.say(cow)
    // cowContainer.replaceAll('`', '´')


    await interaction.reply(`\`\`\`${cowsay.say(cow).replaceAll('`', '´')}\`\`\``);
  },
};
