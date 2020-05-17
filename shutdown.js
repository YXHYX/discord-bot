module.exports = {
    name: 'shutdown',
    description: 'Shutdown the bot',
    guildOnly: true,
    cooldown: 120,
    args: true,
    async execute(message, args, client)
    {
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        if (message.author.id !== '657341410332377097') return message.reply('you dont have permission to execute this command');
        if (args[0] && args[0] <= 50) {
            var count = parseInt(args[0]);
            message.channel.send('shutting down in ' + count.toString() + ' seconds');
            await sleep(count * 1000);
        }
        message.reply('Shutting down...').then(msg => client.destroy());
    }
}