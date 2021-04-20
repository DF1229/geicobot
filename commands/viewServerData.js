const Logger = require('../custom_modules/logger');
const Server = require('../data/models/server');
const Discord = require('discord.js');

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
        
        const guilds = await Server.findAll();

        if (!guilds[0]) {
            msg.channel.send(`:x: ***Database is empty! Please run \`insertserverdata\` command first! ***`);
            return Logger(msg.author.tag, 'tried to viewserverdata, but the database was empty.');
        }
        
        guilds.forEach(guild => {
            console.log(guild);

            embed.setTitle(guild.guildName);
            embed.addField('guildID', guild.guildID, true);
            embed.addField('memberCount', guild.memberCount, true);
            embed.addField('prefix', guild.prefix, true);
            embed.addField('economyEnabled', guild.economyEnabled, true);

            msg.channel.send(embed).catch(err => console.error(err));
        });
        Logger(msg.author.tag, "viewed server data.");
    }
}