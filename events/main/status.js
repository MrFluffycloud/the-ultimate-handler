module.exports = {
	name: 'ready',
	once: false,
	async execute(client) {
		const status = require('../../config/status');
		const updatePresence = () => {
			const presence =
				status.presences[Math.floor(Math.random() * status.presences.length)];
			let activity = presence.activity;
			client.user.setPresence({
				activities: [{ name: activity, type: presence.type.toUpperCase() }],
				status: status.mode || 'online',
			});
		};

		updatePresence();

		setInterval(() => {
			updatePresence();
		}, 60000);
	},
};
