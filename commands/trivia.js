const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	name: 'trivia', // command name
	description: 'Trivia questions!', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 2, // cooldown in seconds, defaults to 3
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	aliases: [],
	data: new SlashCommandBuilder()
		.setName('trivia')
		.setDescription('Trivia questions!'),

	async execute(interaction) { // inside here command stuff
		try {
			await fetch('https://jservice.io/api/random', { method: 'Get' })
				.then(async response => {
					const [body] = await response.json();
					const triviaembed = new Discord.MessageEmbed()
						.setTitle('Catrgory: ' + body.category.title)
						.setDescription(`${body.question}\nAnswer: ||${body.answer}||`)
						.setColor('RANDOM');
					interaction.reply({ embeds: [triviaembed] });
				});
		}
		catch (error) {
			const returnError = { message: error.message, stack: error.stack, code: 500, report: false, myMessage: 'Uh-oh, something went wrong!' };
			throw returnError;
		}
	},
};