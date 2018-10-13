const Discord = require('discord.js');
const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const path = require('path');
const {
	version,
	description
} = require('./package.json');
const config = require('./config/config.json');

const {
	calcDays
} = require("./utils/tools/calcdays.js");
const statusList = require("./utils/lists/status.json");


const DBL = require("dblapi.js");
const dbl = new DBL(config.dblToken);

const DiscordBots = require('discordbots');
const dbots = new DiscordBots(config.dbotsToken);

// Init client
const client = new Commando.Client({
	owner: config.ownerid,
	commandPrefix: config.prefix,
	disableEveryone: true,
	unknownCommandResponse: false
});

client.registry
	// Registers your custom command groups
	.registerGroups([
		['colour', 'Colour'],
		['info', 'Information'],
		['jlogs', 'Join Logs']
		//['rp_sfw', 'SFW Roleplay']
	])

	// Registers all built-in groups, some commands, and argument types
	.registerDefaultGroups()
	.registerDefaultTypes()
	.registerDefaultCommands({
		help: false,
		prefix: false,
		eval_: true,
		ping: false,
		commandState: false
	})

	// Registers all of your commands in the ./commands/ directory
	.registerCommandsIn(path.join(__dirname, 'commands'));



client.on('ready', () => {
	console.log(`\nLogged in:
Bot: ${client.user.tag} / ${client.user.id} / v${version} (Codename ${description})

Shard: ${client.shard.id} (count ${client.shard.count})
`);

	client.user.setActivity(client.commandPrefix + "colours |  v" + version + " / " + description + " | " + client.shard.id, {
			type: 'WATCHING'
		})
		.then(presence => console.log(`Activity set.`))
		.catch(console.error);

	setInterval(() => {

		if (config.dblToken) { //discordbots.org
			dbl.postStats(client.guilds.size, client.shard.id, client.shard.count);
			console.log("Discordbots.org stats posted! Server count: " + client.guilds.size)
		}

		/* if (config.dbotsToken) { // bots.discord.pw
			dbots.postBotStats(client.user.id, {
				"server_count": client.guilds.size
			});
			console.log("Bots.discord.pw stats posted! Server count: " + client.guilds.size)
		} */

	}, 1800000);

	/*client.user.setUsername('jColour Alpha');
  client.user.setAvatar('./avatar.png')*/

	// Sorry I wanted to update bot info, left it there  ^

});

client.getGuildData = function (id) { // server is a circular object so I have to make my own object
	const guild = client.guilds.find("id", id);
	if (guild) {
		const json = { // Guild name and empty array
			"name": guild.name,
			"roles": []
		};
		const colourRoles = guild.roles.array().filter( // only colour roles
			role =>
			role.name.toLowerCase().startsWith("colour ") &&
			!(role.name.toLowerCase().startsWith("colour u-"))
		);
		colourRoles.forEach(role =>  // push each role into array
			json["roles"].push({
				"name": role.name,
				"colour": role.hexColor,
				"id": role.id
			})
		)
		return json; // return json
	} else {
		return false; // return false so the main process knows which one to pick
	}
}

client.getCommandData = function () { // we need to get command data this way too
	const json = []
	client.registry.commands.filter( // no eval commands
		command => !([
			"eval"
		].includes(command.name))
	).forEach(command => json.push( // every commands name format desc and group
		{
			"name": command.name,
			"format": command.format,
			"desc": command.description,
			"group": command.group.name
		}
	))
	return json;
}

client.handleWebhook = function (type, bot, user) { // handles webhooks for each shard
	if (type === "test") {
		console.log("Received webhook test!");
	}
	if (bot === client.user.id && type === "upvote") {
		client.settings.set(`vote-${user}`, new Date())
	};
}

client.setProvider( // Sqlite database for prefixes and such
	sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.on('guildMemberAdd', member => {

	// This is the default role
	const autoRole = member.guild.roles.find("name", "colour default");

	if (autoRole) { // If the role exists (otherwise null)

		member.addRole(autoRole, `jColour: Join role (=> ${autoRole.name})`);

	}
});

client.on('commandRun', command => {

	// Logs the command in cyan
	console.log('\x1b[36m%s\x1b[0m', "CMD " + command.name + " / " + command.group.name)
});

client.on('guildMemberAdd', member => {

	//Let's gather some data.

	const targetChannel = member.guild.channels.find("id", member.guild.settings.get("joinLogsChannel", null));
	const autoRole = member.guild.roles.find("id", member.guild.settings.get("joinLogsAutoRole", null));
	const autoBotRole = member.guild.roles.find("id", member.guild.settings.get("joinLogsBotRole", null));
	const verification = member.guild.settings.get("joinLogsVerification", null);

	if (targetChannel) { // If join logs is enabled (a channel is set)

		// Let's get some messages for it lol
		const titles = [
      `${member.user.username} popped up!`,
      `${member.user.username} joined in the fun!`,
      `${member.user.username} joined.`,
      `${member.user.username} clicked the invite!`
    ];

		// Chooses a random title
		title = titles[Math.floor(Math.random() * titles.length)];

		let embed = new Discord.RichEmbed()

			// Sets base info for the embed
			.setTitle(title)
			.setThumbnail(member.user.avatarURL)
			.setColor("GREEN")
			.setFooter(new Date())

			// Adds fields with info related to the member
			.addField("User", `${member.user.tag} (${member.user})`)
			.addField("ID", member.user.id)
			.addField("Account Made", `${calcDays(new Date(), member.user.createdAt)} days ago`)
			.addField("Member Count", member.guild.memberCount)



		if (member.user.bot && autoBotRole) { // If member is a bot AND auto bot role exists
			targetChannel.send({
				embed
			});
			member.addRole(autoBotRole, "Join Logs (Auto Bot Role)");

		} else if (!member.user.bot && !verification) { // If member is not a bot and there's no verification
			targetChannel.send({
				embed
			});
			if (autoRole) { // If there's an auto role
				member.addRole(autoRole, "Join Logs (Auto Role)");
			};

		} else if (!member.user.bot && verification && autoRole) { // If member is not a bot and there's verification and an autorole
			const welcomeMessage = `${member}, welcome to the server! You're currently unverified. Please wait for a moderator to check you. We'll ping you once we're done.`
			targetChannel.send(welcomeMessage, {
					embed
				})
				.then(function (message) {
					message.react("✅")
					message.react("❌")
				})
				.catch(
					console.error
				);

		}

	}
});

client.on('guildMemberRemove', member => {

	const targetChannel = member.guild.channels.find("id", member.guild.settings.get("joinLogsChannel"));

	if (targetChannel) {

		const titles = [`${member.user.username} left the building.`, `Bye ${member.user.username}!`,
    `See you later, ${member.user.username}.`, `${member.user.username} has disappeared.`];
		title = titles[Math.floor(Math.random() * titles.length)];

		let embed = new Discord.RichEmbed()

			.setTitle(title)
			.setThumbnail(member.user.avatarURL)
			.setColor("RED")
			.setFooter(new Date())

			.addField("User", `${member.user.tag} (${member.user})`)
			.addField("ID", member.user.id)
			.addField("Account Made", `${calcDays(new Date(), member.user.createdAt)} days ago`)
			.addField(`Joined ${member.guild.name}`, `${calcDays(new Date(), member.joinedAt)} days ago`)
			.addField("Member Count", member.guild.memberCount)

		targetChannel.send({
			embed
		});
	}
});



client.login(config.token); // Logins to the api
