module.exports = {
    name: 'announce',
    description: 'Announce stuff in the server',
    guildOnly: true,
    cooldown: 20,
    usage: '<channel> <mention> <message>',
    args: true,
    execute(message, args, client) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('You don\'t have permissions to use that command.');

        let msg = "";

        let channel = client.channels.find(channel => channel.name === args[0]);

        if (!client.channels.find(channel => channel.name === args[0])) return message.reply('no channel such as ' + args[0] + ' exists');

        if (args[1] === 'true')
        {
            msg = "@everyone, ";
        }

        for (var i = 2; i < args.length; i++)
        {
            msg += args[i] + " ";
        }

        channel.send(msg);
    }
}