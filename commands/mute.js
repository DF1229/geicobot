const Discord = require('discord.js');

module.exports = {
    works: true,
    name: 'mute',
    description: 'Mutes a person',
    args: true,
    argsNum: 1,
    usage: '<user>',
    guildOnly: true,
    execute(msg, args) {
        if (!msg.guild.available) return;

        msg.member.addRole('641211676724690958')
            .then(msg.channel.send(`no u`))
            .catch(console.error);
    }
}