const fs = require('fs');
const { info, error, warn } = require('../utils/functions');

module.exports = async (client) => {
	try {
		let theevents;
		fs.readdirSync('./events/').forEach((dir) => {
			theevents = fs
				.readdirSync(`./events/${dir}/`)
				.filter((file) => file.endsWith('.js'));
			for (let file of theevents) {
				const event = require(`../events/${dir}/${file}`);
				if (event.once) {
					client.once(event.name, (...args) => event.execute(...args, client));
				} else {
					client.on(event.name, (...args) => event.execute(...args, client));
				}
			}
		});
	} catch (err) {
		error(err);
	}
};
