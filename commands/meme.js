const Logger = require('../custom_modules/logger.js');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    works: true,
    name: 'meme',
    description: 'Sends a random meme from the pool',
    args: false,
    guildOnly: false,
    adminOnly: false,
    auditLog: false,
    cooldown: 5,
    execute(msg) {
        fs.readFile('./commands/memepool.json', (err, rawdata) => {
            if (err) {
                msg.channel.send(`:x: An error occured trying to read the file, ${msg.author}.`);
                console.error(err);
                return Logger(msg.author.tag, `requested a meme, but an error occured while trying to read memepool.json`);
            } else if (!rawdata) {
                msg.channel.send(`:x: I successfully read the file, but the data was not delivered to me as expected... whoopsie!`);
                return Logger(msg.author.tag, `requested a meme, but the rawdata variable was empty.`);
            }

            const memepool = JSON.parse(rawdata);

            let rand = Math.floor(Math.random() * memepool.urls.length);
            const url = memepool.urls[rand].location;
            const author = memepool.urls[rand].addedBy;
            const id = memepool.urls[rand].id;

            let embed = new Discord.MessageEmbed()
                .setColor('#00FF15')
                .setImage(url)
                .setFooter(`Added by ${author} - ID: ${JSON.stringify(id)}`);
                
            msg.channel.send(embed);
            Logger(msg.author.tag, `meme succesfully delivered.`);
        });


                            /* OLD MEME.JS UPDATED TO USE v12 EMBEDS ON 01-09-2020 */
        // fs.readFile('./commands/memepool.json', (err, rawdata) => {
        //     if (err) {
        //         msg.channel.send(`:x: An error occured trying to read the file, ${msg.author}.`);
        //         throw new Error(err);
        //     }

        //     if (!rawdata) return msg.channel.send(':x: I successfully read the file, but the data was undefined... *again* :face_palm:');
            
        //     const memepool = JSON.parse(rawdata);
            
        //     let rand = Math.floor(Math.random() * memepool.urls.length);
        //     const url = memepool.urls[rand].location;
        //     const author = memepool.urls[rand].addedBy;
        //     const id = memepool.urls[rand].id;

        //     let embed = new Discord.RichEmbed()
        //         .setColor('#00FF15')
        //         .setImage(url)
        //         .setFooter(`Added by ${author} - ID: ${JSON.stringify(id)}`);

        //     return msg.channel.send(embed);
        // });
    }
}