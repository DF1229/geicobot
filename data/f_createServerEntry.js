const Server = require('./models/server');

module.exports = async function (guild) {
    const guildID = guild.id;
    const memberCount = guild.memberCount;

    try {
        Server.create({
            guildID,
            memberCount
        });
    } catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
    return true;
}  