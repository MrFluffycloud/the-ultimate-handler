const prettyMilliseconds = require('pretty-ms');
const discord = require('discord.js');
const cooldowns = new discord.Collection();
const { info, error, warn, genEmbed } = require('../../utils/functions');

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		if (!interaction.guild) return interaction.reply(`I only work in Guilds.`);

		const command = client.interactions.get(interaction.commandName);

		if (!command) return;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new discord.Collection());
		}

		const now = Date.now();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(interaction.user.id)) {
			const expirationTime =
				timestamps.get(interaction.user.id) + cooldownAmount;
			if (now < expirationTime) {
				const timeLeft = expirationTime - now;
				return interaction.reply({
					embeds: [
						genEmbed(
							`Please wait ${prettyMilliseconds(
								timeLeft,
							)} more second(s) before reusing the \`${
								command.data.name
							}\` command.`,
							client.colors.error,
						),
					],
					ephemeral: true,
				});
			}
		}

		if (command.ownerOnly) {
			if (!client.config.ownerIds.includes(interaction.user.id))
				return interaction.reply({
					embeds: [
						genEmbed(
							`This command is to be only used by Bot Owners`,
							client.colors.error,
						),
					],
					ephemeral: true,
				});
		}
		if (command.channelOnly && command.channelOnly.length > 0) {
			if (!command.channelOnly.includes(interaction.channel.id))
				return interaction.reply({
					embeds: [
						genEmbed(
							`This command can't be used in this channel`,
							client.colors.error,
						),
					],
					ephemeral: true,
				});
		}
		if (command.guilds && command.guilds.length > 0) {
			if (!command.guilds.includes(interaction.guild.id))
				return interaction.reply({
					embeds: [
						genEmbed(
							`This command can't be used in this Guild`,
							client.colors.error,
						),
					],
					ephemeral: true,
				});
		}

		timestamps.set(interaction.user.id, now);
		setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

		try {
			await command.execute(interaction, client);
		} catch (err) {
			error(err);
			await interaction.reply({
				embeds: [
					genEmbed(
						`There was an error while executing this command!`,
						client.colors.error,
					),
				],
				ephemeral: true,
			});
		}
	},
};
