const { Command } = require('discord.js-commando');
const Discord = require('discord.js');
const { e926 } = require("./../../utils/web/limitedE926.js");


module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hug',
      group: 'rp_sfw',
      memberName: 'hug',
      description: 'Hugs someone!',
      examples: ['hug @jaqreven', "hug jaqreven"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },

      args: [
        {
          key: 'member',
          label: 'user',
          prompt: 'Who would you like to hug?',
          type: 'member'
        }
      ]
    });
  }

  async run(msg, args) {
    const member = args.member;
    const author = msg.member;
    if (member === author) {
      return msg.reply("Why would you hug yourself? That's just sad!");
    } else {
      // Start typing
      await msg.channel.startTyping();

      // Making an opinion
      const opinions = require('./../../utils/lists/opinions.json');
      const opinion = opinions[Math.floor((Math.random() * opinions.length))];

      // Fetching a pic from e926, utils/web/limitedE926.js
      const pic = await e926("hugging", "score");
      let embed = new Discord.RichEmbed()

        // Sets info for embed
        .setTitle(`${author.displayName} is hugging ${member.displayName}.`)
        .setDescription(`They seem to ${opinion}.\n${pic[1]}`)
        .setImage(pic[0])
        .setColor(msg.guild.me.displayColor)

      // Sends the embed
      msg.channel.stopTyping(true);
      return msg.channel.send({embed});
    }
  }
};
