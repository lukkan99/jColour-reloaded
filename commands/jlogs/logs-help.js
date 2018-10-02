const {Command} = require('discord.js-commando');

module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'logs-help',
      group: 'jlogs',
      memberName: 'logs-help',
      description: 'Detailed info on how the join logs work.',
      examples: ["logs-help", "logs-help there are no arguments smh"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      }
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_CHANNELS') || this.client.isOwner(msg.author);
  }

  async run(msg, args) {

    const prefix = msg.guild.commandPrefix;

    const help = `**JOIN LOGS HELP**
Join logs offer tons of customizability. First you need to select the channel to send join logs to.
Do that with zzzzzzzzz i'll finish it later`;

    await msg.send(help);


  }
};
