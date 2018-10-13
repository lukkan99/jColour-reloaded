const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const opinions = require('./../../utils/lists/negative_opinions.json');
const { e926 } = require("./../../utils/web/limitedE926.js");


module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'dab',
      group: 'rp_sfw',
      memberName: 'dab',
      description: 'Look at my dab, bitch dab *spins a fidget spinner*',
      examples: ['dab', "dab arguments are useless sorry"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      }
    });
  }

  async run(msg, args) {
    const author = msg.member;

    // Start typing
    await msg.channel.startTyping();

    // Making an opinion
    const opinion = opinions[Math.floor((Math.random() * opinions.length))];

    // Fetching a pic from e926, utils/web/limitedE926.js
    const pic = await e926("dab", "score");
    let embed = new Discord.RichEmbed()

      // Sets info for embed
      .setTitle(`${author.displayName} is dabbing..`)
      .setDescription(`${opinion}\n${pic[1]}`)
      .setImage(pic[0])
      .setColor(msg.guild.me.displayColor)

    // Sends the embed
    msg.channel.stopTyping(true);
    return msg.channel.send({embed});
  }
};
