const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const util = require('minecraft-server-util');

module.exports = {
	name: 'mcping', // command name
	description: 'Pings a minecraft server', // command description
	args: true, // needs arguments? delete line if no
	usage: '<bedrock|java> <IP> [port]', // usage instructions w/o command name and prefix
	cooldown: 10, // cooldown in seconds, defaults to 3
	permissions: [], // permissions required for command
	myPermissions: ['SEND_MESSAGES'], // permissions bot needs for command
	aliases: ['pingmc'],
	data: new SlashCommandBuilder()
		.setName('mcping')
		.setDescription('Pings a minecraft server')
		.addStringOption(option =>
			option.setName('type')
				.setRequired(true)
				.setDescription('The type of server to ping.')
				.addChoices([
					['java', 'java'],
					['bedrock', 'bedrock'],
				]))
		.addStringOption(option =>
			option.setName('ip')
				.setRequired(true)
				.setDescription('The IP of the server.'))
		.addNumberOption(option =>
			option.setName('port')
				.setRequired(false)
				.setDescription('The port of the server.')),


	execute(interaction) { // inside here command stuff
		const type = interaction.options.getString('type').toLowerCase();
		const ip = interaction.options.getString('ip');
		let pingport = 0;
		if (!interaction.options.getNumber('port')) {
			if (type === 'bedrock') {
				pingport = 19132;
			}
			else if (type === 'java') {
				pingport = 25565;
			}
		}
		else {
			pingport = parseFloat(interaction.getNumber('port'));
		}

		if (type === 'java') {
			util.status(ip, { port: pingport }) // pings a minecraft server
				.then((response) => {
					const mcpingembed = new Discord.MessageEmbed()
						.setTitle(ip)
						.setDescription(`**Online players:** ${response.onlinePlayers}/${response.maxPlayers}\n**Server version:** ${response.version}\n**Latency:** ${response.roundTripLatency}ms\n**Motd:** ${response.description.descriptionText}`)
						.setThumbnail('https://media.minecraftforum.net/attachments/300/619/636977108000120237.png')
						.setColor('#0ffc03');
					interaction.reply({ embeds: [mcpingembed] }).catch((err) => {
						console.log(err);
						interaction.reply({ content: 'Error sending embed', ephemeral: true });
					});
				})
				.catch(() => {
					const mcpingembed = new Discord.MessageEmbed()
						.setTitle(ip)
						.setDescription('**Online players:** Cannot connect to server\n**Server version:** Cannot connect to server\n**Latency:** Cannot connect to server\n**Motd:** Cannot connect to server')
						.setThumbnail('https://www.freepnglogos.com/uploads/warning-sign-png/warning-sign-red-png-17.png')
						.setColor('#fc0303');
					interaction.reply({ embeds: [mcpingembed] }).catch((err) => {
						console.log(err);
						interaction.reply({ content: 'Error sending embed.', ephemeral: true });
					});
					return;
				});
		}
		else if (type === 'bedrock') {
			util.query(ip, { port: pingport }) // pings a minecraft server
				.then((response) => {
					const mcpingembed = new Discord.MessageEmbed()
						.setTitle(ip)
						.setDescription(`**Online players:** ${response.onlinePlayers}/${response.maxPlayers}\n**Latency:** ${response.roundTripLatency}ms\n**Motd:** ${response.description.descriptionText}`)
						.setThumbnail('https://media.minecraftforum.net/attachments/300/619/636977108000120237.png')
						.setColor('#0ffc03');
					interaction.reply({ embeds: [mcpingembed] }).catch((err) => {
						console.log(err);
						interaction.reply({ content: 'Error sending embed', ephemeral: true });
					});
				})
				.catch((error) => {
					console.log(error);
					const mcpingembed = new Discord.MessageEmbed()
						.setTitle(ip)
						.setDescription('**Online players:** Cannot connect\n**Server version:** Cannot connect to server\n**Latency:** Cannot connect to server\n**Motd:** Cannot connect to server')
						.setThumbnail('https://www.freepnglogos.com/uploads/warning-sign-png/warning-sign-red-png-17.png')
						.setColor('#fc0303');
					interaction.reply({ embeds: [mcpingembed] }).catch((err) => {
						console.log(err);
						interaction.reply({ content: 'Error sending embed', ephemeral: true });
					});
					return;
				});
		}
	},
};