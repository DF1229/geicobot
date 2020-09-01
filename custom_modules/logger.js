const fs = require('fs');
module.exports = log;


var log = function(authorTag, description) {
    const date = new Date();
    const day = date.day;
    const month = date.month + 1; // defaults to 0 for january, so +1 for easy reading
    const year = date.year;

    var nextEntry = `${date.getTime()} - ${authorTag} ${description} \n`;

    fs.appendFile(`../logs/${year}-${month}-${day} - log.txt`, nextEntry, 'utf8', (err) => {
        if (err) throw new Error(err);
    });
    console.log(nextEntry);
}