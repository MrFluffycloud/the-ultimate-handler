console.clear();
require('dotenv').config();
require('./scripts/checker').client();

const config = require('./config/config.js');
const fs = require('fs');
const { Client, Collection } = require('discord.js');

const client = new Client({
	allowedMentions: {
		parse: ['roles', 'users'],
		repliedUser: false,
	},
	intents: config.client.intents,
	partials: config.client.partials,
});
require('./scripts/checker').finish(client);

client.interactions = new Collection();
client.categories = fs.readdirSync(`${__dirname}/commands/`);

client.config = config;
client.colors = client.config.colors;
client.emotes = require('./config/emotes.js');
global.functions = require('./utils/functions.js');
global.package = require('./package/index');

['events', 'interaction', 'anti-Crash'].forEach((handler) => {
	require(`${__dirname}/handlers/${handler}`)(client);
});

['cronjobs'].forEach((utils) => {
	require(`${__dirname}/utils/${utils}`)(client);
});

client.login(config.client.token);
