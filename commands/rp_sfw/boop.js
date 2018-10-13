const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { e926 } = require("./../../utils/web/limitedE926.js");


module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'boop',
      group: 'rp_sfw',
      memberName: 'boop',
      description: 'Boops someone!',
      examples: ['boop @jaqreven', "boop jaqreven"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },

      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'Who would you like to boop?',
          type: 'member'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const author = msg.member;
    if (member === author) {
      return msg.reply("Why would you boop yourself? That's just sad!");
    } else {
      // Start typing
      await msg.channel.startTyping();

      // Making an opinion
      const opinions = require('./../../utils/lists/opinions.json');
      const opinion = opinions[Math.floor((Math.random() * opinions.length))];

      // Fetching a pic from e926, utils/web/limitedE926.js
      const pic = await e926("boop", "score");
      let embed = new Discord.RichEmbed()

        // Sets info for embed
        .setTitle(`${author.displayName} is booping ${member.displayName}.`)
        .setDescription(`They seem to ${opinion}.\n${pic[1]}`)
        .setImage(pic[0])
        .setColor(msg.guild.me.displayColor)

      // Sends the embed
      msg.channel.stopTyping(true);
      return msg.channel.send({embed});
    }
  }
};
