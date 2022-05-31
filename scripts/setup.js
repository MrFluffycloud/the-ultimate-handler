const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const chalkPipe = require('chalk-pipe');
const chalk = require('chalk');
const inquirer = require('inquirer');
const figlet = require('figlet');
const { createSpinner } = require('nanospinner');
const fs = require('fs');
const prettier = require('prettier');
const { info, error, warn } = require('../utils/functions');

const questions = [
	{
		type: 'editor',
		name: 'token',
		message: "What's the Bot Token",
		validate(value) {
			const pass = value.match(/[A-Za-z\d]{23}\.[\w-]{6}\.[\w-]{27}/g);
			if (pass) {
				return true;
			}

			return 'Please enter a valid Bot Token';
		},
	},
	{
		type: 'editor',
		name: 'id',
		message: "Bot's Client ID",
		validate(value) {
			const pass = value.match(/[0-9]{16,}/gm);
			if (pass) {
				return true;
			}

			return 'Please enter a valid Client ID';
		},
	},
	{
		type: 'editor',
		name: 'secret',
		message: "Bot's Client Secret",
	},
	{
		type: 'checkbox',
		message: "Choose Your Client's Inetns",
		name: 'intents',
		choices: [
			{
				name: 'GUILDS',
				checked: true,
			},
			{
				name: 'GUILD_MEMBERS',
				checked: true,
			},
			{
				name: 'GUILD_BANS',
			},
			{
				name: 'GUILD_EMOJIS_AND_STICKERS',
			},
			{
				name: 'GUILD_INTEGRATIONS',
			},
			{
				name: 'GUILD_WEBHOOKS',
			},
			{
				name: 'GUILD_INVITES',
			},
			{
				name: 'GUILD_VOICE_STATES',
			},
			{
				name: 'GUILD_PRESENCES',
			},
			{
				name: 'GUILD_MESSAGES',
				checked: true,
			},
			{
				name: 'GUILD_MESSAGE_REACTIONS',
			},
			{
				name: 'GUILD_MESSAGE_TYPING',
			},
			{
				name: 'DIRECT_MESSAGES',
				checked: true,
			},
			{
				name: 'DIRECT_MESSAGE_REACTIONS',
			},
			{
				name: 'DIRECT_MESSAGE_TYPING',
			},
			{
				name: 'GUILD_SCHEDULED_EVENTS',
			},
		],

		validate(answer) {
			if (answer.length < 1) {
				return 'You must choose at least one Intent.';
			}

			return true;
		},
	},
	{
		type: 'checkbox',
		message: "Choose Your Client's Partials",
		name: 'partials',
		choices: [
			{
				name: 'MESSAGE',
				checked: true,
			},
			{
				name: 'CHANNEL',
				checked: true,
			},
			{
				name: 'GUILD_MEMBER',
				checked: true,
			},
			{
				name: 'REACTION',
				checked: true,
			},
			{
				name: 'USER',
			},
			{
				name: 'GUILD_SCHEDULED_EVENT',
			},
		],
	},
	{
		type: 'editor',
		name: 'guildId',
		message: 'Guild ID for loading the non global commands',
		validate(value) {
			const pass = value.match(/[0-9]{16,}/gm);
			if (pass) {
				return true;
			}

			return 'Please enter a valid Guild ID';
		},
	},
	{
		type: 'editor',
		name: 'ownerIds',
		message:
			"ID's of the owner's of the bot. These users will be able to access the ownerOnly commands",
		suffix: ' (Use , to seperate each user)',
		filter(value) {
			return value.trim().split(/\s*,\s*/);
		},
	},
	{
		type: 'confirm',
		name: 'antiCrash',
		message: 'Should the Anti Crash System be Enabled?',
		default: false,
	},
	{
		type: 'input',
		name: 'main_color',
		message: 'What should be the Main Color be?',
		default: '#6D28D9',
		transformer(color, answers, flags) {
			const text = chalkPipe(color)(color);
			if (flags.isFinal) {
				return text + '!';
			}

			return text;
		},
	},
	{
		type: 'input',
		name: 'error_color',
		message: 'What should be the Error Color be?',
		default: '#ED4245',
		transformer(color, answers, flags) {
			const text = chalkPipe(color)(color);
			if (flags.isFinal) {
				return text + '!';
			}

			return text;
		},
	},
	{
		type: 'input',
		name: 'success_color',
		message: 'What should be the Success Color be?',
		default: '#57F287',
		transformer(color, answers, flags) {
			const text = chalkPipe(color)(color);
			if (flags.isFinal) {
				return text + '!';
			}

			return text;
		},
	},
	{
		type: 'input',
		name: 'neutral_color',
		message: 'What should be the Neutral Color be?',
		default: '#858585',
		transformer(color, answers, flags) {
			const text = chalkPipe(color)(color);
			if (flags.isFinal) {
				return text + '!';
			}

			return text;
		},
	},
];
async function x() {
	await console.clear();
	await inquirer.prompt(questions).then(async (answers) => {
		const spinner = await createSpinner('Generating Config File...').start();
		const { Intents } = require('discord.js');

		const config = {
			antiCrash: answers.antiCrash,
			client: {
				intents: answers.intents.map((x) => {
					return Intents.FLAGS[x];
				}),
				partials: answers.partials || [],
				token:
					process.env.CLIENT_TOKEN ||
					answers.token.replaceAll('\r', '').replaceAll('\n', ''),
				secret:
					process.env.CLIENT_SECRET ||
					answers.secret.replaceAll('\r', '').replaceAll('\n', ''),
				id: answers.id.replaceAll('\r', '').replaceAll('\n', ''),
			},
			guildId: answers.guildId.replaceAll('\r', '').replaceAll('\n', ''),
			ownerIds: answers.ownerIds || [],
			colors: {
				main: answers.main_color,
				error: answers.error_color,
				success: answers.success_color,
				neutral: answers.neutral_color,
				white: '#FFFFFF',
				black: '#000000',
			},
		};

		fs.writeFileSync(
			'./config/config.js',
			prettier.format(`module.exports =${JSON.stringify(config, null, 2)}`, {
				arrowParens: 'always',
				bracketSpacing: true,
				endOfLine: 'lf',
				insertPragma: false,
				jsxBracketSameLine: false,
				jsxSingleQuote: false,
				printWidth: 80,
				proseWrap: 'preserve',
				quoteProps: 'as-needed',
				requirePragma: false,
				semi: true,
				singleQuote: true,
				tabWidth: 2,
				trailingComma: 'all',
				useTabs: true,
				parser: 'babel',
			}),
			'utf-8',
		);
		spinner.success({ text: `Setup Completed successfully` });
		await sleep();
		figlet(`Setup Complete`, (err, data) => {
			console.log(chalk.blue.bold(data) + '\n');
			info(
				'Please be sure to check the config file, just incase somethings, messed up',
			);
			process.exit(0);
		});
	});
}

x();
