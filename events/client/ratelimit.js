const { info, error, warn } = require('../../utils/functions');

module.exports = {
	name: 'ratelimit',
	once: true,
	async execute(client) {
		info(`Ready! Logged in as ${client.user.tag}`);
	},
};
