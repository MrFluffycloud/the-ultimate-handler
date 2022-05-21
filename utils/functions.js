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
 * This File consists some important functions used across the handler
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
 */

const discord = require('discord.js');
const chalk = require('chalk');

module.exports = {
	info: function (msg) {
		if (!msg) new TypeError('No Message Found');
		return console.info(chalk.bold.gray('[ Info ]', chalk.reset.white(msg)));
	},
	warn: function (msg) {
		if (!msg) new TypeError('No Message Found');
		return console.warn(chalk.bold.yellow('[ Warn ]', chalk.reset.white(msg)));
	},
	error: function (msg) {
		if (!msg) new TypeError('No Message Found');
		return console.error(chalk.bold.red('[ Error ]', chalk.reset.white(msg)));
	},
	antiCrash: function (msg) {
		if (!msg) new TypeError('No Message Found');
		return console.warn(
			chalk.bold.red('[ Anti Crash ]', chalk.reset.white(msg)),
		);
	},
	messageExists: async function (messageId, channelId, client) {
		let channel = await client.channels.fetch(channelId);
		if (!channel) throw new Error("Couldn't find any channel with that id");
		let message = await channel.messages.fetch(messageId);
		if (!message) return false;
		return message;
	},
	genEmbed: function (desc, color, title) {
		let colors = require('../config/config').colors;
		if (!desc)
			throw new TypeError('What are you trying to do without an Description');
		if (desc.length > 2000)
			throw new TypeError("Description Can't be over 2000 characters");

		let embed = new discord.MessageEmbed()
			.setDescription(desc)
			.setColor(color || colors.main);

		if (title) embed.setTitle(title);

		return embed;
	},
};
