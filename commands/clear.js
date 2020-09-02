const Logger = require('../custom_modules/logger.js');

module.exports = {
    works: true,
    name: 'clear',
    description: 'Clear up to 99 messages from the current channel',
    args: true,
    argsNum: 1,
    usage: '<amount>',
    auditLog: true,
    guildOnly: true,
    adminOnly: false,
    execute(msg, args) {
        if (!msg.guild.available) {
            Logger(msg.author.tag, `tried to clear ${args[0]} messages from channel ${msg.channel.name} (id: ${msg.channel.id}), but something went wrong on Discord's side.`);
            return msg.channel.send(`:x: Something went wrong on Discord's side...\nTry again later ${msg.author}!`);
        }
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {
            Logger(msg.author.tag, `did not have permission to clear ${args[0]} messages`);
            return msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}!`);
        }
        if (isNaN(args[0])) {
            Logger(msg.author.tag, `didn't provide a number when trying to clear messages from ${msg.channel.name} (id: ${msg.channel.id}).`);
            return msg.channel.send(`:x: That doesn't seem to be a valid number ${msg.author}`);
        }
        if (args[0] < 1 || args[0] > 99) {
            Logger(msg.author.tag, `provided a number that was too low or too high when trying to clear messages from ${msg.channel.name} (id: ${msg.channel.id}).`);
            return msg.channel.send(`:x: That doesn't seem to be a valid input, note that you can only delete up to 99 messages at a time ${msg.author}`);
        }

        msg.channel.bulkDelete(args[0], true).catch(err => {
            console.error(err);
            msg.channel.send(`:x: There was an error trying to clear the message from the channel :shrug:`);
            return Logger(msg.author.tag, `tried to clear ${args[0]} messages from channel ${msg.channel.name} (id: ${msg.channel.id}), but an unknown error occured.`);
        });

        Logger(msg.author.tag, `cleared ${args[0]} messages from channel ${msg.channel.name} (id: ${msg.channel.id}).`);
    }
}