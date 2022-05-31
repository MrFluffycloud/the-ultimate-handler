const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Receive the list of Commands the Bot got at the moment.')
		.addStringOption((option) =>
			option
				.setName('command')
				.setDescription('A Specific Command | Category')
				.setRequired(false),
		),

	cooldown: 2,
	category: 'info',
	global: true,
	ownerOnly: false,
	channelOnly: [],
	guilds: [],
	async execute(interaction, client) {
		const cmd = interaction.options.getString('command');
		if (cmd) {
			await interaction.deferReply({ ephemeral: true });
			const command = await client.interactions.get(cmd.toLowerCase());

			if (!command) {
				const tembed = new MessageEmbed()
					.setTitle('Help')
					.setThumbnail(client.user.displayAvatarURL())
					.setFooter({
						text: `Requested by ${interaction.user.tag}`,
						iconURL: interaction.user.avatarURL({ dynamic: true }),
					});

				let category1 = client.categories.includes(cmd.toLowerCase());

				if (!category1) {
					return interaction.editReply({
						content: 'Unknown Command / Category: `' + cmd + '`',
						ephemeral: true,
					});
				}

				let input = cmd.toLowerCase();
				const embed = tembed.setColor(client.colors.main);
				const module = client.categories.filter(
					(cat) => cat === input.toLowerCase(),
				);

				var text = `There is no category called \`${input.toLowerCase()}\``;
				if (module === '[]')
					return interaction.editReply({ content: text, ephemeral: false });
				const commands = (category) => {
					return client.interactions
						.filter((cmd) => {
							return cmd.category === category;
						})
						.map(
							(cmd) =>
								`**[${
									cmd.data.name[0].toUpperCase() + cmd.data.name.slice(1)
								}](https://youtube.com/c/MrFluffycloud)**\n<:reply:927070516458700860> \`${
									cmd.data.description[0].toUpperCase() +
									cmd.data.description.slice(1)
								}\``,
						)
						.join(`\n`);
				};
				text = module.map((cat) => `${commands(cat)}`);

				return interaction.editReply({
					embeds: [
						embed
							.setTitle(`\`${input[0].toUpperCase() + input.slice(1)}\``)
							.setDescription(`${text}`),
					],
					ephemeral: false,
				});
			}

			let embed = new MessageEmbed()
				.setAuthor({
					name: command.data.name[0].toUpperCase() + command.data.name.slice(1),
				})
				.addField('Description', command.data.description || 'Not Provided :(')
				.addField('Cooldown', `${command.cooldown}s`)
				.setColor(client.colors.main)
				.setFooter({
					text: client.user.username,
					iconURL: client.user.displayAvatarURL(),
				});

			return interaction.editReply({
				embeds: [embed],
				ephemeral: false,
			});
		} else {
			await interaction.deferReply({ ephemeral: false });
			const embed = new MessageEmbed()
				.setColor(client.colors.main)
				.setThumbnail(client.user.displayAvatarURL())
				.setTitle('Help Menu')
				.setFooter({
					text: `${client.user.tag}`,
					iconURL: client.user.displayAvatarURL(),
				});
			const commands = (category) => {
				let data = client.interactions
					.filter((cmd) => {
						return cmd.category.toLowerCase() === category;
					})
					.map((cmd) => {
						return `\`${cmd.data.name}\``;
					});
				return data;
			};
			try {
				for (let i = 0; i < client.categories.length; i += 1) {
					const current = client.categories[i];
					const items = commands(current);
					embed.addField(
						`${current.toUpperCase()} [${items.length}]`,
						`\`${items.join('`, `')}\``,
					);
				}
			} catch (e) {
				console.log(String(e.stack));
			}

			return interaction.editReply({
				embeds: [embed],
			});
		}
	},
};
