const fetch = require('node-fetch');

module.exports = {
	name: 'insult', // command name
	description: 'Insults you.', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 0.5, // cooldown in seconds, defaults to 3
	aliases: [],
	execute(message) { // inside here command stuff
		const insultsettings = { method: 'Get' };
		const insulturl = 'https://insult.mattbas.org/api/insult.json'; // insult api
		fetch(insulturl, insultsettings)
			.then(res => res.json())
			.then((json) => {
				message.channel.send(json.insult);
			})
			.catch(err => {
				console.log(err);
				message.channel.send('There was an error completing your request, try again later!');
			});
	},
};