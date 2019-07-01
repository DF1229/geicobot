module.exports = {
	name: 'ping',
    description: 'Pong!',
    args: false,
    guildOnly: false,
    adminOnly: false,
	execute(message, args) {
		message.channel.send(':ping_pong:');
	},
};