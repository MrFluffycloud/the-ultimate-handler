/**
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * Please Don't edit anything from this file
 * Unless you know what you are doing
 * In Case you do something please don't worry to contact us!
 * Discord - https://discord.gg/9Eg7Ngj2PQ
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 * @Warn
 */

const figlet = require('figlet');
const fs = require('fs');
const { Intents } = require('discord.js');
const { info, error, warn } = require('../utils/functions');
const line = '-'.repeat(32);

module.exports = {
	client: function () {
		info(line);
		console.info(
			figlet.textSync('UDJS!', {
				font: 'rectangles',
				horizontalLayout: 'default',
				verticalLayout: 'default',
				width: 30,
				whitespaceBreak: true,
			}),
		);
		info('v' + require('../package.json').version);

		info(`Authors: MrFluffycloud`);
		info(line);
		if (fs.existsSync('./config/config.js')) {
			info('Config Found!');
			const config = require('../config/config');
			if (Object.keys(config).length <= 0) {
				error('Config Empty!');
				error(`Please Fill it mannually or run the setup`);
				info(`To Run Setup: npm run setup`);
				return process.exit(1);
			}

			if (!config.client) {
				error('Client Config Not Found!');
				error(`Please Create one mannually or run the setup`);
				info(`To Run Setup: npm run setup`);
				return process.exit(1);
			} else if (
				!config.client.id ||
				!config.client.intents ||
				!config.client.secret ||
				!config.client.partials ||
				!config.client.token
			) {
				error('Client Date Not Set!');
				error(`Please Set it up mannually or run the setup`);
				info(`To Run Setup: npm run setup`);
				return process.exit(1);
			} else {
				info(line);
				info(
					`Token: ` +
						config.client.token.slice(0, config.client.token.length / 4) +
						'*'.repeat((config.client.token.length / 4) * 3),
				);
				info(
					`Secret: ` +
						config.client.secret.slice(0, config.client.secret.length / 4) +
						'*'.repeat((config.client.secret.length / 4) * 3),
				);
				info(line);
				info(`Client ID: ${config.client.id}`);
				info(
					`Client Intents: ${config.client.intents
						.map((x) => {
							return new Intents(x).toArray();
						})
						.join(', ')}`,
				);
				info(`Client Partials: ${config.client.partials.join(', ')}`);
				info(line);
			}
			if (config.antiCrash) {
				info(`Anti Crash - Enabled`);
			} else if (!config.antiCrash) {
				info(`Anti Crash - Disabled`);
			}
		} else {
			error('Config Not Found!');

			return process.exit(1);
		}
	},
	finish: function (client) {
		const config = require('../config/config');
		client.once('ready', async () => {
			if (!config.guildId) {
				return warn("Private Guild ID not found! Non-Commands won't load");
			} else if (config.guildId) {
				let guild = client.guilds.cache.get(config.guildId);
				if (!guild) {
					error(
						`I am not in the guild where you have set the guildId in config to..`,
					);
					return process.exit(1);
				} else {
					info(line);
					info(`Private Guild: ${guild.name}`);
				}
			}
			if (config.ownerIds && config.ownerIds.length > 0) {
				let arr = config.ownerIds.map(async (x) => {
					let user = await client.users.fetch(x);
					if (!user) return;
					return user.tag;
				});
				let out = (await Promise.all(arr)).join(', ');
				info(`Owners: ${out}`);
			}

			info(line);
			info(`Ready! Logged in as ${client.user.tag}`);
			info(line);
		});
	},
};
