const { info, error, warn, antiCrash } = require('./functions');
const config = require('../config/config');
module.exports = () => {
	if (config.antiCrash) {
		process.on('unhandledRejection', (reason, p) => {
			antiCrash('Unhandled Rejection/Catch');
			console.error(reason, p);
		});
		process.on('uncaughtException', (err, origin) => {
			antiCrash('Uncaught Exception/Catch');
			console.error(err, origin);
		});
		process.on('uncaughtExceptionMonitor', (err, origin) => {
			antiCrash('Uncaught Exception/Catch (MONITOR)');
			console.error(err, origin);
		});
		process.on('multipleResolves', (type, promise, reason) => {
			antiCrash('Multiple Resolves');
			console.error(type, promise, reason);
		});
	}
};
