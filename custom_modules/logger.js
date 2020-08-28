const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    add(authorTag, description) {
        const date = new Date();
        const day = date.day;
        const month = date.month + 1; // defaults to 0 for january, so +1 for easy reading
        const year = date.year;

        var nextEntry = `${date.getTime()} - ${authorTag} ${description} \n`;

        fs.appendFile(`${year}-${month}-${day} - log.txt`, nextEntry, 'utf8', (err) => {
            if (err) return console.error(err);
        });
    }
}