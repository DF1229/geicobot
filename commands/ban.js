const auditLogger = require('../custom_modules/auditLogEmbed.js');
const Log = require('../custom_modules/consoleLog.js');

module.exports = {
    name: 'ban',
    description: 'Bans a user from the server',
    usage: '(user)',
    args: true,
    argsNum: 1,
    auditLog: true,
    guildOnly: true,
    adminOnly: false,
    execute(msg) {
        if (!msg.member.hasPermission('BAN_MEMBERS')) {
            Log.misc(`${msg.author} failed banning ${msg.mentions.members.first()}`);
            return msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}`);
        }

        const taggedMember = msg.mentions.members.first();
        if (!taggedMember) return msg.channel.send(`:x: Be sure to actually mention a user, instead of just writing down their name ${msg.author}!`);

        msg.mentions.members.first().ban({ reason: `Issued by ${msg.author.tag}` }).then(() => {
            auditLogger.execute(msg, 'ban');
            Log.action(msg, this.name);
            return msg.channel.send(`:white_check_mark: User ${msg.mentions.members.first()} banned! :wave:`);
        }).catch(err => {
            if (err.name === 'DiscordAPIError' && err.message === 'Missing Permissions') {
                msg.channel.send(`:x: I can't ban that user! This usually means they're an admin on this server ${msg.author} :face_palm:`);
            }
            Log.misc(`${msg.author} failed banning ${msg.mentions.members.first()}`);
        });
    }
};