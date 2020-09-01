const fs = require('fs');

module.exports = {
    works: false,
    name: 'newflirt',
    description: '<o/',
    args: true,
    usage: '<your icebreaker>',
    auditLog: false,
    guildOnly: false,
    adminOnly: false,
    execute(msg, args) {
        
        if (!msg.guild.available) { return; } // Guild not available, no point in sending messages

        fs.readFile('./commands/icebreakers.json', (err, rawData) => {
            if (err) {
                msg.channel.send(`:x: Something went wrong reading \`icebreakers.json\`, ${msg.author}! :face_palm:`); // error with command
                throw new Error(err);
            }

            if (!rawData) return msg.channel.send(`:x: Something went wrong reading \`icebreakers.json\` ${msg.author}! :face_palm:`);

            const icebreakers = JSON.parse(rawData);
            const newID = icebreakers.icebreakers.length;

            var newIcebreaker = "";
            args.forEach(element => {
                newIcebreaker += (element + " ");
            });

            icebreakers.icebreakers.push({
                "id": newID,
                "icebreaker": newIcebreaker,
                "addedBy": msg.author.tag
            });

            const newIcebreakerPool = JSON.stringify(icebreakers);

            fs.writeFile('./commands/icebreakers.json', newIcebreakerPool, err => {
                if (err) return msg.channel.send(`:x: Something went wrong saving the list of icebreakers, ${msg.author}! :face_palm:`);
            });

            msg.channel.send(`:white_check_mark: Succesfully saved into the list of icebreakers, with ID: ${newID}`);
        });

    }
}