const Sequelize = require('sequelize');
const Discord = require('discord.js');

module.exports = {
    works: true,
    name: 'gatherserverdata',
    description: 'test',
    adminOnly: true,
    guildOnly: false,
    args: false,
    execute(msg) {
        const guilds = msg.client.guilds.cache;

        guilds.each(guild => {
            let embed = new Discord.MessageEmbed()
                .setColor('DARK_VIVID_PINK')
                .setFooter(msg.client.user.tag, msg.client.user.avatarURL())
                .setTitle(`Guild data: ${guild.name}`)
                .addField('Guild ID', guild.id, true)
                .addField('Guild members', guild.memberCount, true);
            msg.channel.send(embed);
        });
    }
}