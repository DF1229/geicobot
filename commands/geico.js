module.exports = {
    works: true,
    name: 'geico',
    description: 'GEICO!!!',
    args: false,
    auditLog: false,
    guildOnly: false,
    adminOnly: false,
    execute(msg, args) {
        return msg.channel.send(`${msg.author} https://geico.com`);
    }
}
