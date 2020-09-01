const Logger = require('../custom_modules/logger.js');
const Discord = require('discord.js');

module.exports = {
	name: 'ping',
    description: 'Pong!',
    args: false,
    guildOnly: false,
    adminOnly: false,
	async execute(msg, args) {
		let embed = new Discord.MessageEmbed()
            .setColor('DARK_GOLD')
            .setTimestamp()
            .setTitle('Ping :ping_pong: Pong')
            .setFooter(msg.client.user.tag, msg.client.user.avatarURL);

        const m = await msg.channel.send('Pinging...');

        embed.addField('Ping to bot', `${m.createdTimestamp - msg.createdTimestamp}ms`, true);
        embed.addField('API Heartbeat', `${Math.round(msg.client.ping)}ms`, true);
        m.edit(embed);
        Logger.log(msg.author.tag, `pinged the bot.`);
	},
};