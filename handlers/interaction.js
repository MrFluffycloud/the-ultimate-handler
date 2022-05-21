const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { info, error, warn } = require('../utils/functions');

module.exports = async (client) => {
	const clientId = client.config.client.id;
	const guildId = client.config.guildId;

	const GlobalCommands = [];
	const GuildCommands = [];

	fs.readdirSync('./commands/').forEach(async (dir) => {
		const commandFiles = fs
			.readdirSync(`./commands/${dir}/`)
			.filter((file) => file.endsWith('.js'));

		commandFiles.forEach(async (file) => {
			const command = require(`../commands/${dir}/${file}`);
			if (command.global) {
				GlobalCommands.push(command.data.toJSON());
			} else if (!command.global) {
				GuildCommands.push(command.data.toJSON());
			} else {
				warn(`Unable to publish ${command.data.name}`);
			}
			await client.interactions.set(command.data.name, command);
		});
	});

	const rest = new REST({ version: '9' }).setToken(client.config.client.token);

	(async () => {
		try {
			info('Started refreshing application (/) commands.');
			await rest.put(Routes.applicationCommands(clientId), {
				body: GlobalCommands,
			});

			await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
				body: GuildCommands,
			});

			info('Successfully reloaded application (/) commands.');
		} catch (err) {
			error(err);
		}
	})();
};
