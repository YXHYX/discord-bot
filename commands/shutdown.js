module.exports = {
    name: 'shutdown',
    description: 'Shutdown the bot',
    guildOnly: true,
    cooldown: 120,
    args: false,
    execute(message, args, client)
    {
        if (message.author.id === '657341410332377097') return message.reply('Shutting down...').then(msg => client.destroy());
        message.reply('you dont have permission to execute this command');
    }
}