const { info, error, warn } = require('../../utils/functions');

module.exports = {
	name: 'rateLimit',
	once: true,
	async execute(data) {
		warn(`[RateLimited] - ${data}`);
	},
};
