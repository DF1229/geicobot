const Server = require('./models/server.js');

/** View all data stored for a guild
 * 
 * @param {GuildID} guildID Guild's unique identifier
 * @returns 
 */
module.exports = async function(guildID) {
    const data = await Server.findAll({where: {guildID}});
    if (!data) {
        console.log('data var empty');
        return false;
    } else {
        console.log(data);
        return true;
    }
}