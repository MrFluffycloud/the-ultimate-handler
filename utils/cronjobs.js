const Discord = require('discord.js');

const CronJob = require('cron').CronJob;

module.exports = (client) => {
	const every24 = new CronJob(
		'0 0 * * *',
		async function () {
			// 24 hours
		},
		null,
		true,
		'America/Los_Angeles',
	);
	const every12 = new CronJob(
		'0 */12 * * *',
		async function () {
			// 12 hours
		},
		null,
		true,
		'America/Los_Angeles',
	);
	
	every12.start();
	every24.start();
};
