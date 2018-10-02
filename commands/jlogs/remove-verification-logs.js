const {Command} = require('discord.js-commando');
const sqlite = require('sqlite');

module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove-verification-logs',
      group: 'jlogs',
      memberName: 'remove-verification-logs',
      description: 'Removes the bot role (set-verification-logs command)',
      examples: ["remove-verification-logs", "remove-verification-logs no arguments"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },
      aliases: [
        "remove-verificationlogs",
        "removeverificationlogs",
        "remove-verify-logs",
        "remove-verifylogs",
        "removeverifylogs"
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_CHANNELS') || this.client.isOwner(msg.author);
  }

  async run(msg, args) {

    msg.guild.settings.remove("joinLogsVerificationLogs");
    msg.say("The Join Logs verification logs have been removed.");



  }
};
