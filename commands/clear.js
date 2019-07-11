const auditLogger = require('../custom_modules/auditLogEmbed.js');
const Log = require('../custom_modules/consoleLog.js');

module.exports = {
    name: 'clear',
    description: 'Clear up to 99 messages from the current channel',
    args: true,
    argsNum: 1,
    usage: '<amount>',
    auditLog: true,
    guildOnly: true,
    adminOnly: false,
    execute(msg, args) {
        if (!msg.guild.available) {Log.error(msg, 'Clear'); return msg.channel.send(`:x: Something went wrong on Discord's side...\nTry again later ${msg.author}!`);}
        if (!msg.member.hasPermission('MANAGE_MESSAGES')) {Log.misc(`${msg.author.tag} did not have permission to clear ${args[0]} messages`); return msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}!`);}
        if (isNaN(args[0])) {Log.misc(`${msg.author.tag} provided NaN to bulk delete messages`); return msg.channel.send(`:x: That doesn't seem to be a valid number ${msg.author}`);}
        if (args[0] < 1 || args[0] > 99) {Log.misc(`${msg.author.tag} provided invalid arguments`); return msg.channel.send(`:x: That doesn't seem to be a valid input, note that you can only delete up to 99 messages at a time ${msg.author}`);}
        
        msg.channel.bulkDelete(args[0], true).catch(err => {
            console.error(err);
            return msg.channel.send(`:x: There was an error trying to clear the message from the channel :shrug:`);
        });
        
        auditLogger.generalLog(msg, 'bulkDelete', `${args[0]} messages removed`);
        Log.action(msg, this.name);

    }
}