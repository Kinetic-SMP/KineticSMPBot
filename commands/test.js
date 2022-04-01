/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */

const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'test', // command name
	description: 'Test bits of code here', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 1, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: [], // permissions bot needs for command
	ownerOnly: true, // need to be the owner? delete line if no
	disabled: true,
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Test bits of code here')
		.addStringOption(option =>
			option.setName('option1')
				.setRequired(false)
				.setDescription('A required description for the option.')),

	async execute(interaction) {
		const error = new Error();
		const returnError = { message: error.message, stack: error.stack, code: 418 };
		throw returnError;
	},
};