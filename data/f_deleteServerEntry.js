const Server = require('./models/server');

module.exports = async function (guild) {
    const guildID = guild.id;

    try {
        await Server.destroy({
            where: {
                guildID
            }
        });
    } catch (err) {
        if (err) {
            console.log(err);
            return false;
        }
    }
    return true;
}