const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('node-fetch');

module.exports = {
	name: 'insult', // command name
	description: 'Insults you.', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 0.5, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('insult')
		.setDescription('Insults you.'),

	async execute(interaction) { // inside here command stuff
		const insultsettings = { method: 'Get' };
		const insulturl = 'https://insult.mattbas.org/api/insult.json'; // insult api
		try {
			await fetch(insulturl, insultsettings)
				.then(res => res.json())
				.then((json) => {
					interaction.reply(json.insult);
				})
				.catch(err => {
					throw new Error(err.stack);
				});
		}
		catch (error) {
			const returnError = { message: error.message, stack: error.stack, code: 500, report: true, myMessage: 'Uh-oh, something went wrong!' };
			throw returnError;
		}
	},
};