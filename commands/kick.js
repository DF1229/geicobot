const auditLogger = require('../custom_modules/auditLogEmbed.js');

module.exports = {
    name: 'kick',
    description: 'Kicks a user from the server',
    usage: '(user)',
    args: true,
    argsNum: 1,
    auditLog: true,
    guildOnly: true,
    adminOnly: false,
    execute(msg) {
        if (!msg.member.hasPermission('KICK_MEMBERS')) {
            return msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}`);
        }

        const taggedMember = msg.mentions.members.first();
        if (!taggedMember) return msg.channel.send(`:x: Be sure to actually mention a user, instead of just writing down their name ${msg.author}!`);

        msg.mentions.members.first().kick({ reason: `Issued by ${msg.author.tag}` }).then(() => {
            auditLogger.execute(msg, 'kick');
            return msg.channel.send(`:white_check_mark: User ${msg.mentions.members.first()} kicked! :wave:`);
        }).catch(err => {
            if (err.name === 'DiscordAPIError' && err.message === 'Missing Permissions') {
                msg.channel.send(`:x: I can't kick that user! This usually means they're an admin on this server ${msg.author} :face_palm:`);
            }
        });
    }
};