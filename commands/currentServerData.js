const Discord = require('discord.js');
const logger = require('../custom_modules/logger');

module.exports = {
    name: 'currentserverdata',
    works: true,
    adminOnly: true,
    guildOnly: true,
    description: 'Get info on your current server',
    execute(msg) {
        if (!msg.guild.available) return;

        let embed = new Discord.MessageEmbed()
            .setTitle(msg.guild.name)
            .setFooter(msg.client.user.tag, msg.client.user.avatarURL([{ 'dynamic': true }]))
            .setTimestamp()
            .addField('Guild ID', msg.guild.id, true)
            .addField('Guild name', msg.guild.name, true)
            .addField('Member count', msg.guild.memberCount, true)
            .addField('Owner', msg.guild.owner, true)
            .addField('Owner ID', msg.guild.ownerID, true)
            .addField('Region', msg.guild.region, true)
            .addField('Created at', msg.guild.createdAt, true);

        msg.channel.send(embed).then().catch(err => {
            console.error(err);
            logger(msg.author.tag, `requested server info embed, but an error occured:\n${err}`)
        });
    }
}