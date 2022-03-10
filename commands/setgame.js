const { SlashCommandBuilder } = require('@discordjs/builders');
const got = require('got');

module.exports = {
	name: 'setgame', // command name
	description: 'Sets the bot\'s game.', // command description
	usage: '<game name> **or** use nothing to get the latest github update', // usage instructions w/o command name and prefix
	cooldown: 5, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	ownerOnly: true, // need to be the owner? delete line if no
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('setgame')
		.setDescription('Sets the bot\'s game.')
		.addStringOption(option =>
			option.setName('game')
				.setRequired(true)
				.setDescription('The game name.')),

	execute(interaction) { // inside here command stuff
		if (!interaction.options.getString('game')) {
			got('https://api.github.com/repos/johng3587/Harold/commits')
				.then(response => {
					const commits = JSON.parse(response.body);
					const latest = commits[0];
					interaction.client.user.setActivity(`Latest update: ${latest.commit.message}`);
					interaction.reply(`Game set to \`Latest update: ${latest.commit.message}\``);
				});
		}
		else {
			interaction.client.user.setActivity(interaction.options.getString('game'));
			interaction.reply(`Game set to ${interaction.options.getString('game')}`);
		}

	},
};