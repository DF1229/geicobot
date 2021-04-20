const f_readServerEntry = require("../data/f_readServerEntry")
const logger = require("../custom_modules/logger")

module.exports = {
    works: true,
    name: 'readserverentry',
    description: 'Get all stored data per GuildID',
    args: true,
    argsNum: 1,
    guildOnly: false,
    adminOnly: true,
    execute(msg, args) {
        if (f_readServerEntry(args[0])) {
            msg.channel.send(`Data for server \`${args[0]}\` logged to console.`);
            logger(msg.author.tag, `read server data for server with id ${args[0]}`);
        } else {
            msg.channel.send(`I couldn't find that server in my database, is the database up to date?`);
            logger(msg.author.tag, `tried to read data for server with id ${args[0]}, but that id is not in the database.`)
        }
    }
}