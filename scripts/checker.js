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

const fs = require('fs');
const { info, error, warn } = require('../utils/functions');

function x() {
	if (fs.existsSync('./config/config.js')) {
		info('Config Found!');
		const config = require('../config/config');
		if(Object.keys(config).length <= 0) {
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
		}
	} else {
		error('Config Not Found!');

		return process.exit(1);
	}
}

x();
