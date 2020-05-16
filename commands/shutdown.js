module.exports = {
    name: 'shutdown',
    description: 'Shutdown the bot',
    guildOnly: true,
    cooldown: 120,
    args: false,
    execute(message, args, client)
    {
        message.reply('Shutting down...').then(msg => client.destroy());
    }
}