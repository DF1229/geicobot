const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'newmeme',
    description: 'Adds a new meme to the memepool',
    args: true,
    argsNum: 1,
    usage: '<url>',
    guildOnly: false,
    adminOnly: false,
    auditLog: false,
    execute(msg, args) {
        if (!args[0].startsWith('https://')) return msg.channel.send(`:x: Url denied because of bad format, always use \`https://\` ${msg.author}!`);
        if (!args[0].match(/(https:)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/gi)) return msg.channel.send(`:x: The link you provided doesn't link to a supported media type. (jpg, jpeg, gif, or png)`);

        fs.readFile('./commands/memepool.json', (err, rawdata) => {
            if (err) {
                msg.channel.send(`:x: Something went wrong reading the memepool, ${msg.author} :face_palm:`); // with comma
                throw new Error(err);
            }

            if (!rawdata) return msg.channel.send(`:x: Something went wrong reading the memepool ${msg.author} :face_palm:`); // without comma
            const memepool = JSON.parse(rawdata);
            const newPos = memepool.urls.length;

            memepool.urls.push({
                "id": newPos,
                "location": args[0],
                "addedBy": msg.author.tag
            });

            const newMemepool = JSON.stringify(memepool)

            fs.writeFile('./commands/memepool.json', newMemepool, err => {
                if (err) return msg.channel.send(`:x: Something went wrong saving the memepool ${msg.author} :face_palm:`);
            });

            msg.channel.send(`:white_check_mark: Successfully saved into the memepool with ID: ${newPos}`);
        });
    }
}