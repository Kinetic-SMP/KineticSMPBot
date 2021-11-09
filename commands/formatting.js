const Discord = require('discord.js');
    
module.exports = {
    name: 'formatting', //command name
    description: 'A guide to Discord formatting', //command description
    args: false, //needs arguments?
    usage: ``, //usage instructions w/o command name and prefix
    guildOnly: false, //execute in a guild only?
    cooldown: 3, //cooldown in seconds, defaults to 3
    permissions: [], //permissions required for command
    ownerOnly: false, //need to be the owner? delete line if no
    disabled: false, //command disabled to all? delete line if no
    aliases: ['format'],
    execute(message, args, prefix) { //inside here command stuff
        const formatembed = new Discord.MessageEmbed()
            .setTitle('A handy guide to Discord formatting')
            .addFields(
                { name: 'Text Formatting', value: '**bold**\n*italic*\n__underline__\n~~strikethrough~~\n***bold and italic***\n***__~~bold, italic, underlined, and strikethrough~~__***\n||spoiler||'},
                { name: 'Quote Formatting', value: '> - quote a single line\n>>> - quote until end of message'},
                { name: 'Mention Formatting', value: '<@userId> - mention a user\n<@&roleId> - mention a role\n<#channelId> - mention a channel'},
                { name: 'Code Formatting', value: '\`Single line code block, no color\`\n\`\`‎\`codingLanguage\nMulti-line code block, with language color\n\`\`‎\`'},
                { name: 'Time Formatting', value: '<t:unixTimestamp:d> - send a timestamp in mm/dd/yyyy format\n<t:unixTimestamp:D> - send a timestamp in Month Day, Year format\n<t:unixTimestamp:t> - send a timestamp in hh:mm AM/PM format\n<t:unixTimestamp:T> - send a timestamp in hh:mm:ss AM/PM format\n<t:unixTimestamp:f> - send a timestamp in Month Day, Year hh:mm AM/PM format\n<t:unixTimestamp> - send a timestamp in Month Day, Year hh:mm AM/PM format\n<t:unixTimestamp:F> - send a timestamp in Weekday, Month Day, Year hh:mm AM/PM format\n<t:unixTimestamp:R> - send a timestamp in relative format\nunixTimestamp - send a timestamp in unix format\nConverter at [hammertime](https://hammertime.djdavid98.art/)'}
            )
        message.author.send({embeds: [formatembed]})
        message.react('📬')
    },
};