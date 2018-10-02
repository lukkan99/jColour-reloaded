const {Command} = require('discord.js-commando');
const sqlite = require('sqlite');

module.exports = class ChannelCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'toggle-verification',
      group: 'jlogs',
      memberName: 'toggle-verification',
      description: 'Toggles the verification mode for join logs',
      examples: ["toggle-verification", "toggle-verification no arguments"],
      guildOnly: true,
      throttling: {
          usages: 2,
          duration: 10
      },
      aliases: [
        "toggleverification",
        "toggle-verif",
        "toggle-verify",
        "toggleverif",
        "toggleverify"
      ]
    });
  }

  hasPermission(msg) {
    return msg.member.hasPermission('MANAGE_CHANNELS') || this.client.isOwner(msg.author);
  }

  async run(msg, args) {

    const verify = msg.guild.settings.get("joinLogsVerification");

    if (verify) { // IF verification is on

      msg.guild.settings.remove("joinLogsVerification"); // Turns it off
      msg.guild.settings.remove("joinLogsVerificationLogs");
      await msg.say("The extra verification has been disabled.")

    } else { // Else if verification is off (undefined)

      if (this.client.provider.get(msg.guild, "joinLogsAutoRole")) { // Auto role exists

        msg.guild.settings.set("joinLogsVerification", true); // Turns verification on
        await msg.say("The extra verification has been enabled.");

      } else { // Else is no auto role

        await msg.say("You must enable the auto role for verification.") // Tells the user to have auto role enabled

      }

    };

  }
};
