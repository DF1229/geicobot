const Discord = require('discord.js');

module.exports = {
    modLog(msg, commandName) {
        /*let color;
        if (commandName === 'ban')
            color = '#FF8B32';
        else if (commandName === 'kick')
            color = '#FF2600';

        let embed = new Discord.RichEmbed()
            .setColor(color)
            .setAuthor(msg.author.tag, msg.author.avatarURL)
            .addField('Action', commandName)
            .addField('User affected', `${msg.mentions.users.first()}`)
            .addField('Command issued by', msg.author.tag)
            .setTimestamp()
            .setFooter(msg.guild.me.user.tag);

        const channels = msg.guild.channels;
        const geicoLog = channels.find(channels => channels.name === 'geico-log');
        return geicoLog.send(embed);*/
    },
    generalLog(msg, type, details) {
        /*let descEmoji, actionDesc;
        switch (type) {
            case 'bulkDelete':
                actionDesc = 'Bulk message clearing';
                break;
            default:
                actionDesc = ':interrobang:';
                break;
        }

        let embed = new Discord.RichEmbed()
            .setColor('#D6ADFF')
            .setAuthor(msg.author.tag, msg.author.avatarURL)
            .setThumbnail('https://images.emojiterra.com/twitter/512px/1f5d1.png')
            .addField('Action', actionDesc)
            .addField('Command issued by', msg.author.tag);        
        if (details) embed.addField('Details', details, true);
        embed.setFooter(msg.guild.me.user.tag);
        embed.setTimestamp();

        const channels = msg.guild.channels;
        const geicoLog = channels.find(channels => channels.name === 'geico-log');
        return geicoLog.send(embed);*/
    }
}
