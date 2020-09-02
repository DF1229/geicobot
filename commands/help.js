const Logger = require('../custom_modules/logger.js');
const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    works: true,
    name: 'help',
    description: 'List all available commands, or get info on a specific command.',
    usage: '[command]',
    guildOnly: false,
    adminOnly: false,
    execute (msg, args) {
        const { commands } = msg.client;
        let embed = new Discord.MessageEmbed()
                .setColor('GOLD')
                .setTimestamp()
                .setFooter(msg.client.user.tag, msg.client.user.avatarURL([{'dynamic': true}]));
        
        if (args.length == 1) {
            const name = args[0].toLowerCase();
            const command = commands.get(name);

            if (!command) {
                msg.channel.send(`:x: I couldn't find that command, ${msg.author}!`);
                return Logger(msg.author.tag, `requested a help embed, but provided an unknown command: ${name}.`);
            }
            embed.setTitle(name)
            embed.setDescription(command.description);

            if (command.usage) embed.addField('Usage', `${prefix}${name} ${command.usage}`, true);
            if (command.guildOnly) embed.addField('Guild-only', command.guildOnly, true);
            if (command.adminOnly) embed.addField('Dev-only', command.adminOnly, true);
        } else if (args.length == 0) {
            embed.title = "Available commands";

            commands.each(command => {
                const name = command.name;
                const description = command.description;

                if (!command.works) return;

                if (command.usage) {
                    const usage = `${prefix}${name} ${command.usage}`;
                    embed.addField(name, usage, true);
                } else {
                    embed.addField(name, description, true);
                }
            });
        } else {
            msg.channel.send(`:x: You provided too many arguments, ${msg.author}!`);
            return Logger(msg.author.tag, `requested a help embed, but provided too many arguments.`);
        }

        return msg.channel.send(embed)
            .then(Logger(msg.author.tag, 'used help command.'))
            .catch(console.error);
        
        // OLD HELP.JS UPDATED TO USE v12 EMBEDS ON 28-8-2020
        /* const data = [];
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
        if (command.adminOnly) data.push(`**Admin-only:** ${command.adminOnly}`);

        data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

        msg.channel.send(data, { split: true }).then().catch(err => {
            console.error(err);
        });*/
    },
};