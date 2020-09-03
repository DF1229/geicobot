const Logger = require('../custom_modules/logger');
const Servers = require('../data/models/servers');

module.exports = {
    works: true,
    name: 'insertserverdata',
    adminOnly: true,
    guildOnly: false,
    async execute(msg) {
        const guilds = msg.client.guilds.cache;

        try {
            for (guild in guilds) {
                const newDate = await Servers.create({
                    "guildID": msg.guild.id,
                    "guildName": msg.guild.name,
                    "memberCount": msg.guild.memberCount
                });
            }
            Logger(msg.author.tag, 'succesfully registered current server data into the database.');
            msg.channel.send(`Done.`);
        } catch (err) {
            if(err) {
                console.error(err);
                Logger(msg.author.tag, 'tried to register current server data, but an error occured.');
                msg.channel.send(`Error, is \`Servers.sync({'force': true})\` enabled?`);
            }
        }
    }
}