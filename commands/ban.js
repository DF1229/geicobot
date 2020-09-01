const auditLogger = require('../custom_modules/auditLogEmbed.js');
const Logger = require('../custom_modules/logger.js');

module.exports = {
    works: true,
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
            Logger.log(msg.author.tag), "used the ban command without the proper permissions.";
            return msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}`);
        }

        const taggedMember = msg.mentions.members.first();
        if (!taggedMember) return msg.channel.send(`:x: Be sure to actually mention a user, instead of just writing down their name ${msg.author}!`);

        msg.mentions.members.first().ban({ reason: `Issued by ${msg.author.tag}` }).then(() => {
            auditLogger.execute(msg, 'ban');
            Logger.log(msg.author.tag, `used ban command on ${taggedMember.user.tag}.`);
            return msg.channel.send(`:white_check_mark: User ${msg.mentions.members.first()} banned! :wave:`);
        }).catch(err => {
            if (err.name === 'DiscordAPIError' && err.message === 'Missing Permissions') {
                msg.channel.send(`:x: I can't ban that user! This usually means they're an admin on this server ${msg.author} :face_palm:`);
                return Logger.log(msg.author.tag, `tried to ban ${taggedMember.user.tag}, but their target was an admin.`);
            }
            return Logger.log(msg.author.tag, `tried to ban ${taggedMember.user.tag}, but an unknown error occured.`);      
        });
    }
};