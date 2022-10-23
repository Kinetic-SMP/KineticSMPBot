/* eslint-disable no-undef */
const fs = require('fs');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');

function logUsage(command) {
	const usage = JSON.parse(fs.readFileSync('./usage.json', 'utf8'));
	usage[command.name] = usage[command.name] ? usage[command.name] + 1 : 1;
	fs.writeFileSync('./usage.json', JSON.stringify(usage, null, 4));
}

function makeid(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

async function refreshShortUrls() {
	try {
		const newUrls = JSON.parse(fs.readFileSync('./shorturls.json', 'utf8'));
		if (process.shortUrls) {
			await delete process.shortUrls;
		}
		process.shortUrls = newUrls;
		console.log('Refreshed short URls!');
	}
	catch (error) {
		return error;
	}
}

async function refreshConfig() {
	try {
		const newConfig = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
		if (process.haroldConfig) {
			await delete process.haroldConfig;
		}
		process.haroldConfig = newConfig;
		console.log('Refreshed config!');
	}
	catch (error) {
		return error;
	}
}

async function getRedditPost(subreddit) {
	const response = await fetch(`https://www.reddit.com/r/${subreddit}/random/.json`, { method: 'Get' }); // random reddit post
	const [list] = await response.json();
	const [post] = list.data.children;
	let type = post.data.post_hint;

	let title = post.data.title;
	const permalink = post.data.permalink;
	const url = `https://reddit.com${permalink}`;
	const image = post.data.url;
	const upvotes = post.data.ups;
	const comments = post.data.num_comments;
	const nsfw = post.data.over_18;
	const description = post.data.selftext;
	const author = `u/${post.data.author}`;
	const posttime = post.data.created * 1000;
	const footer = `👍 ${upvotes} 💬 ${comments} • r/${post.data.subreddit}`;
	if (nsfw === true) {
		title = `[NSFW] ${posttitle}`;
	}
	console.log(permalink);
	if (post.data.is_gallery) return;
	if (!type) type = 'text';
	if (type !== 'text' && type !== 'image') return;
	const redditembed = new EmbedBuilder()
		.setTitle(title)
		.setURL(url)
		.setColor('Random')
		.setFooter({ text: footer })
		.setTimestamp(posttime)
		.setAuthor({ name: author, iconURL: 'https://www.redditinc.com/assets/images/site/reddit-logo.png', url: `https://reddit.com/${author}` });
	if (type === 'image') {
		redditembed.setImage(image);
	}
	else if (type === 'text') {
		redditembed.setDescription(description/*  ?? '(No description.)' */);
	}
	else {
		return;
	}

	const returnPost = {
		title,
		permalink,
		url,
		upvotes,
		comments,
		nsfw,
		description,
		author,
		posttime,
		footer,
		redditembed,
		type,
	};
	return returnPost;
}

module.exports = { logUsage, makeid, refreshShortUrls, refreshConfig, getRedditPost };