/*  Project: Geico Insurance (Martin) Discord bot
 *  Language: JavaScript (running with Node.JS)
 *  Library: Discord.js (https://discord.js.org)
 *  
 *  Version: 0.2-beta
 *  Author: Daan Faber (Discord: DF1229#1337)
 *  Date: 02-09-2020
 *  Liscence: MIT
 */

const Logger = require('./custom_modules/logger.js');
const { prefix, token } = require('./config.json');
const Discord = require('discord.js');
const { config } = require('process');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.clear();
    console.log(`-={ ${client.user.tag} logged in and ready with command prefix "${prefix}" }=-`);
    client.user.setActivity("with my feelings", {type: "PLAYING"})
        .catch(console.error);
});

client.on('message', msg => {
    if (msg.channel.type === 'text' && msg.channel.name === 'geico-log' && !msg.author.bot) {
        msg.delete().catch(console.error);
        Logger(`${msg.author.tag}'s message removed from #geico-log at ${msg.createdAt}`);
    }

    if (!msg.content.startsWith(prefix) || msg.author.bot) return;
    
    const args = msg.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;
    
    /*  
    *   If you're familiar with JavaScript, this comment is probably not neccesary for you.
    *   
    *   If you're reading through this trying to learn something, this bit might confuse you, so here's a bit of explanation:
    *   Because the bot already checked if the command exists, everything past this point only gets run if the command actually exists.
    *   With that reasoning, the next couple of if-statements are meant to check if the user has used the command in the right way.
    */
   
    const command = client.commands.get(commandName);

    if (!command.works) {
        return msg.channel.send(`:x: Sorry, that command isn't available right now, ${msg.author}!`);
    }

    if (command.adminOnly) {
        if (msg.user.id != config.adminIDs[0]) return msg.channel.send(`:x: Sorry, that command can currently only be used by the developer!`);
    }

    if (command.guildOnly && msg.channel.type != 'text') {
        Logger(msg.author.tag, `'s ${command.name} command wasn't executed because it was in DM's.`);
        return msg.channel.send(`:x: I can't execute that command here!`);
    }

    if (command.args && !args.length) {
        let reply = `:x: You didn't provide any arguments, ${msg.author}! :x:`;

        if (command.usage) {
            reply += `\n:point_right: The correct usage would be: \`${prefix}${commandName} ${command.usage}\` :point_left:`;
        }

        return msg.channel.send(reply);
    } else if (command.args && args.length > command.argsNum) {
        let reply = `:x: You provided too many arguments, ${msg.author}! :x:`;

        if (command.usage) {
            reply += `\n:point_right: The correct usage would be: \`${prefix}${commandName} ${command.usage}\` :point_left:`;
        }
        return msg.channel.send(reply);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)) {
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;
        
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.channel.send(`:stopwatch: You're doing that too quickly ${msg.author.tag}!\nYou have to wait another ${timeLeft} second(s) before you can do that again!`);
        }
    }

	try {
        command.execute(msg, args);
	} catch (error) {
		console.error(error);
        msg.reply(' there was an error trying to execute that command! :interrobang:');
        Logger(msg.author.id, `Error occurred when trying to execute command.\nError log: ${error}\n`);
	}
});

client.login(token);