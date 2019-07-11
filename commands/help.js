const { prefix } = require('../config.json');
const Log = require('../custom_modules/consoleLog.js');

module.exports = {
    name: 'help',
    description: 'Get a list of all the available commands, or info about a specific command.',
    usage: '[command]',
    guildOnly: false,
    adminOnly: false,
    execute (msg, args) {
        const data = [];
        const { commands } = msg.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command]\` to get info on a specific command!`);

            return msg.author.send(data, {split: true})
                .then(() => {
                    if (msg.channel.type === 'dm') return;
                    msg.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${msg.author.tag}.\n`, error);
                    msg.reply('it seems like I can\'t send you a DM... Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name);

        if (!command) {
            return msg.channel.send(`:x: That's not a valid command, ${msg.author}!`);
        }

        data.push(`**Name:** ${command.name}`);

        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage: ** ${prefix}${command.name} ${command.usage}`);
        if (command.guildOnly) data.push(`**Guild-only:** ${command.guildOnly}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        msg.channel.send(data, { split: true }).then().catch(err => {
            console.error(err);
        });
    },
};