module.exports = {
	name: 'thiscommandmightdosomething', // command name
	description: 'This command may or may not do something.', // command description
	usage: '', // usage instructions w/o command name and prefix
	cooldown: 2, // cooldown in seconds, defaults to 3
	aliases: [],
	execute() { // inside here command stuff
		return;
	},
};