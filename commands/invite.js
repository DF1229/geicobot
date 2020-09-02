const Logger = require('../custom_modules/logger.js');
const Discord = require('discord.js');

module.export = {
    works: true,
    name: 'invite',
    description: 'Get an invite link for the bot',
    args: false,
    guildOnly: false,
    adminOnly: false,
    execute(msg) {
        const id = msg.client.id;
        const perms = 8;

        let embed = new Discord.MessageEmbed()
            .setColor('LIGHTGREEN')
            .setFooter(msg.client.user.tag, msg.client.user.avatarURL([{'dynamic': true}]))
            .setTimestamp()
            .addField('Use this link to invite me to your server!', 
                `https://discord.com/api/oauth2/authorize?client_id=${id}&scope=bot&permissions=${perms}`);
        
        try {
            msg.channel.send(embed);
        } catch(err) {
            if (err) {
                Logger(msg.author.tag, 'requested an invite link, but an error occured');
                throw err;
            } else {
                Logger(msg.author.tag, 'succesfully requested an invite link');
            }
        }
    }
}