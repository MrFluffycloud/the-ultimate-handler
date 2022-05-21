const { Intents } = require('discord.js');

const config = {
	client: {
		intents: [
			Intents.FLAGS.GUILDS,
			Intents.FLAGS.GUILD_MEMBERS,
			Intents.FLAGS.GUILD_MESSAGES,
			Intents.FLAGS.DIRECT_MESSAGES,
		],
		partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER'],
		token: process.env.CLIENT_TOKEN || '',
		secret: process.env.CLIENT_SECRET || '',
		id: 'the-clients-id',
	},
	guildId: 'guildID-to-host-the-non-global-commands',
	ownerIds: [
		//Array of bot owners, Ex: "123456", "!2321432"....
	],
	colors: {
		// These are Default Choosen Colors, You are free to change them
		main: '#6D28D9',
		error: '#ED4245',
		success: '#57F287',
		neutral: '#858585',
		white: '#FFFFFF',
		black: '#000000',
	},
};

module.exports = config;
