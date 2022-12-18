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
      .setMinLength(2)
      .setMaxLength(2))
    .addStringOption((option) => option.setName('tongue')
      .setDescription('design animal\'s tongue')
      .setRequired((false))
      .setMinLength(1)
      .setMaxLength(2)),
  async execute(interaction) {

    const newCowList = (await cowList).map(x => {
      return x.replace('.cow', '');
    });



    const cow = {
      text: 'hello!!',
      f: "bearface",
      e: 'UU',
      T: '',
    };

    if (!(interaction.options.getString('message') == undefined))
      cow.text = interaction.options.getString('message');

    if (!(interaction.options.getString('eyes') == undefined))
      cow.e = interaction.options.getString('eyes');

    if (!(interaction.options.getString('tongue') == undefined))
      cow.T = interaction.options.getString('tongue');

    if (!(interaction.options.getString('animal') == undefined) && (newCowList.includes(interaction.options.getString('animal')))) {
      cow.f = interaction.options.getString('animal');
    } else if (!(interaction.options.getString('animal') == undefined)) {
      await interaction.reply('That cow is no cow in cowsay cow list.');
      return
    }

    // if (!(interaction.options.getString('animal') == undefined)) {
    //   if ((newCowList.includes(interaction.options.getString('animal'))))
    //     cow.f = interaction.options.getString('animal');
    // }

    // if (!(interaction.options.getString('mode') == undefined))
    //   cow.mode = interaction.options.getString('mode');

    const cowResponse = cowsay.say(cow).replaceAll('`', '´');


    if ((cowResponse) > 1999) {
      await interaction.reply('The message is too long, try again!');
    } else {
      await interaction.reply(`\`\`\`${cowsay.say(cow).replaceAll('`', '´')}\`\`\``);
    }
  },
};
