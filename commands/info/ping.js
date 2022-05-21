const { SlashCommandBuilder } = require('@discordjs/builders');


module.exports = {
	data: new SlashCommandBuilder().setName('ping').setDescription('🏓 Ping? Pong!'),
	cooldown: 2,
	category: 'info',
	global: true,
	ownerOnly: false,
	channelOnly: [],
	guilds: [],
	async execute(interaction, client) {
		await interaction.reply(`🏓 Pinging....`);
		await interaction.editReply(`🏓 Pong: ${client.ws.ping}ms!`);
	},
};
