var Logger = require('../custom_modules/logger.js');

module.exports = {
    works: true,
    name: 'geico',
    description: 'GEICO!!!',
    args: false,
    auditLog: false,
    guildOnly: false,
    adminOnly: false,
    execute(msg, args) {
        msg.channel.send(`${msg.author} https://geico.com`);
        return Logger(msg.author.tag, `GEICO'D`);
    }
}
