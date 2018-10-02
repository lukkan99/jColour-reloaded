const {Command} = require('discord.js-commando');
const sqlite = require('sqlite');

module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'set-verify-logs-channel',
      group: 'jlogs',
      memberName: 'set-verify-logs-channel',
      description: 'Sets the join verify logs channel',
      examples: ["set-verify-logs-channel #general", "set-verify-logs-channel #verify-logs"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },
      aliases: [
        "set-verify-log-channel",
        "set-verification-logs",
        "set-verification-logs-channel",
        "verify-logs-channel",
        "set-verify-logs-channel",
        "setverifylogs",
        "set-verify-logs"
      ],
      args: [
        {
          key: 'channel',
          label: 'channel',
          prompt: "What channel should the verification logs get sent to?",
          type: 'channel',
        }
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_CHANNELS') || this.client.isOwner(msg.author);
  }

  async run(msg, args) {

    if (this.client.provider.get(msg.guild, "joinLogsVerification")) { // If verification is on

      msg.guild.settings.set("joinLogsVerificationLogs", args.channel.id); // Sets the log channel
      msg.say("The Join Logs verification logs channel has been updated to " + args.channel);

    } else { // If there is no verification

      msg.say("Extra verification must be enabled before setting up verification logs."); // Yeah

    };


  }
};
