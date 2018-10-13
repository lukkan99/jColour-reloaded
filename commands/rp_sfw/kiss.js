const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { e926 } = require("./../../utils/web/limitedE926.js");


module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kiss',
      group: 'rp_sfw',
      memberName: 'kiss',
      description: 'Kisses someone!',
      examples: ['kiss @jaqreven', "kiss jaqreven"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },

      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'Who would you like to kiss?',
          type: 'member'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const author = msg.member;
    if (member === author) {
      return msg.reply("Why would you kiss yourself? That's just sad!");
    } else {
      // Start typing
      await msg.channel.startTyping();

      // Making an opinion
      const opinions = require('./../../utils/lists/opinions.json');
      const opinion = opinions[Math.floor((Math.random() * opinions.length))];

      // Fetching a pic from e926, utils/web/limitedE926.js
      const pic = await e926("kissing", "score");
      let embed = new Discord.RichEmbed()

        // Sets info for embed
        .setTitle(`${author.displayName} is kissing ${member.displayName}.`)
        .setDescription(`They seem to ${opinion}.\n${pic[1]}`)
        .setImage(pic[0])
        .setColor(msg.guild.me.displayColor)

      // Sends the embed
      msg.channel.stopTyping(true);
      return msg.channel.send({embed});
    }
  }
};
