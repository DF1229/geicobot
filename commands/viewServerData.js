const Logger = require('../custom_modules/logger');
const Servers = require('../data/models/servers');
const Discord = require('discord.js');
const { execute } = require('./gatherServerData');

module.exports = {
    works: true,
    name: 'viewserverdata',
    description: 'Display available data on all saved servers',
    adminOnly: true,
    guildOnly: false,
    async execute(msg) {
        let embed = new Discord.MessageEmbed()
        .setColor('DARK_VIVID_PINK')
        .setFooter(msg.client.user.tag, msg.client.user.avatarURL([{'dynamic': true}]))
        .setTimestamp();
        
        const savedGuilds = await Servers.findAll();
        for (guild in savedGuilds.dataValues) {
            console.log(guild);

            // embed.setTitle(guild.guildName);
            // embed.addField('guildID', guild.guildID);
            // embed.addField('memberCount', guild.memberCount);
            // embed.addField('prefix', guild.prefix);
            // embed.addField('economyEnabled', guild.economyEnabled);

            msg.channel.send(embed).catch(err => console.error(err));
            Logger(msg.author.tag, "viewed server data.");
        }
    }
}