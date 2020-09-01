const Logger = require('../custom_modules/Logger.js');

module.exports = {
    works: true,
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
            msg.channel.send(`:no_entry: You don't have the required permission(s) to use this command ${msg.author}`);
            return Logger.log(msg.author.tag, `tried to kick someone, but didn't have the proper permissions.`);
        }

        const taggedMember = msg.mentions.members.first();
        if (!taggedMember) {
            msg.channel.send(`:x: Be sure to actually mention a user, instead of just writing down their name ${msg.author}!`);
            return Logger.log(msg.author.tag, `tried to kick someone, but didn't mention anyone.`);
        }
        msg.mentions.members.first().kick({ reason: `Issued by ${msg.author.tag}` }).then(() => {
            Logger.log(msg.author.tag, `kicked ${taggedMember.user.tag}.`);
            return msg.channel.send(`:white_check_mark: User ${msg.mentions.members.first()} kicked! :wave:`);
        }).catch(err => {
            if (err.name === 'DiscordAPIError' && err.message === 'Missing Permissions') {
                msg.channel.send(`:x: I can't kick that user! This usually means they're an admin on this server ${msg.author} :face_palm:`);
                return Logger.log(msg.author.tag, `tried to kick ${taggedMember.user.tag}, but their target was an admin!`);
            }
            return Logger.log(msg.author.tag, `tried to kick ${taggedMember.user.tag}, but an unknown error occured.`);
        });
    }
};