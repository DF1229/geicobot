const Logger = require('../custom_modules/logger.js');
const Discord = require('discord.js');

module.exports = {
    works: true,
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
            .setFooter(msg.client.user.tag, msg.client.user.avatarURL([{'dynamic': true}]));

        const m = await msg.channel.send('Pinging...');

        embed.addField('Ping to bot', `${m.createdTimestamp - msg.createdTimestamp}ms`, true);
        embed.addField('API Heartbeat', `${Math.round(msg.client.ws.ping)}ms`, true);
        embed.addField('Websocket status', `${msg.client.ws.status}`, true);
        m.delete();
        msg.channel.send(embed);
        Logger(msg.author.tag, `pinged the bot.`);
	},
};