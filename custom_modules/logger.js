const fs = require('fs');

/**
 * This module functions as an internal logger, to prevent data loss in the event of a crash
 * @param {String} authorTag Tag of the user who initiated the action
 * @param {String} description Description of the action carried out
 */
module.exports = function log(authorTag, description) {
    const date = new Date();
    const UTCstring = date.toISOString().substr(0, 10) // creates ISO (YYYY-MM-DDTHH:MM:SS.xxxZ) string, and removes the time
    const timeString = date.toISOString().substr(11, 8);

    var nextEntry = `${timeString} - ${authorTag} ${description} \n`;

    fs.appendFile(`./logs/${UTCstring}.txt`, nextEntry, 'utf8', (err) => {
        if (err) throw err
    });
    console.log(nextEntry);
}