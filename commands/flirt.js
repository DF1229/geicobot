const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    works: 'no',
    name: 'flirt',
    description: '<o/',
    args: false,
    auditLog: false,
    guildOnly: false,
    adminOnly: false,
    execute(msg, args) {
        if (!msg.guild.available) return; // no point in sending messages, guild not available -> service outage
        
        fs.readFile('./commands/icebreakers.json', (err, rawData) => {
            if (err) return msg.channel.send(`:x: Something went wrong loading \`icebreakers.json\`, ${msg.author}! :face_palm:`);

            var icebreakerPool = JSON.parse(rawData);
            if (!icebreakerPool) return msg.channel.send(`:x: Something went wrong parsing \`icebreakers.json\`, ${msg.author}! :face_palm:`);

            var rand = Math.floor(Math.random() * icebreakerPool.icebreakers.length);
            var selectedIcebreaker = icebreakerPool.icebreakers[rand];

            const icebreaker = icebreakerPool.icebreakers[rand].icebreaker
            const id = icebreakerPool.icebreakers[rand].id;
            const author = icebreakerPool.icebreakers[rand].addedBy;

            if (!selectedIcebreaker) 
                return msg.channel.send(`:x: Something went wrong getting an item from the array, please try again later ${msg.author}! :face_palm:`);
            if (typeof icebreaker != 'string') 
                return msg.channel.send(`:x: Something went wrong, the selected item wasn't a \`String\` object, ${msg.author}! :face_palm:`);
            
            var embed = new Discord.RichEmbed()
                .setColor('#00FF15')
                .addField(icebreaker, ` `, true)
                .setFooter(`Added by ${author} - ID: ${JSON.stringify(id)}`);

            msg.channel.send(embed).catch(console.error);
        });

    }
}
