const Logger = require('../custom_modules/logger');
const Server = require('../data/models/server');

module.exports = {
    works: true,
    name: 'insertserverdata',
    adminOnly: true,
    guildOnly: false,
    async execute(msg) {
        const guilds = msg.client.guilds.cache;

        try {
            guilds.forEach(async guild => {
                await Server.create({
                    "guildID": guild.id,
                    "guildName": guild.name,
                    "memberCount": guild.memberCount
                });
            });
            Logger(msg.author.tag, 'succesfully registered server data into the database.');
            msg.channel.send(`Done, ${i} servers registered into database.`);
        } catch (err) {
            if(err) {
                console.error(err);
                Logger(msg.author.tag, 'tried to register server data, but an error occured.');
                msg.channel.send(`Error, is \`Servers.sync({'force': true})\` enabled?`);
            }
        }
    }
}