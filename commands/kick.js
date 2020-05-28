module.exports = {
    name: 'kick',
    description: 'Kick a specific user from the server',
    guildOnly: true,
    cooldown: 5,
    usage: '<user> <reason>',
    args: true,
    async execute(message, args)
    {
        function getReason()
		{
			if (!args[1]) return;
			let msg = '';
			for (var i = 1; i < args.length; i++) {
				msg += args[i] + ' ';
			}
			return msg;
		}

        if (!message.member.hasPermission('KICK_MEMBERS')) return message.reply('you don\'t have permission to execute this command!');
		if (message.mentions.users.first().id == message.author.id) return message.reply('you can\'t ban yourself!');
        if (message.mentions.users.first().bot) return message.reply('you can\'t ban this bot!');
        
        let User = message.guild.members.get(message.mentions.users.first().id);

        let kickedAt = new Date();
		kickedAt = kickedAt.getFullYear() + '-' + (kickedAt.getMonth() + 1) + '-' + kickedAt.getDate() + ' ' + kickedAt.getHours() + ':' + kickedAt.getMinutes() + ':' + kickedAt.getSeconds();


        const embed = {
			color: 0x0099ff,
			title: `Kicked ${User.user.tag}.`,
			thumbnail:
			{
				url: `${User.user.displayAvatarURL}`,
			},
			fields: [
				{
					name: 'Reason',
					value: 'No reason specified',
				},
				{
					name: 'Kicked At',
					value: `${kickedAt}`,
					inline: true,
				},
			],

			timestamp: new Date(),
			footer: {
				text: 'by YXHYX#2266',
			},
		};
		if (args[1])
			embed.fields[0].value = getReason();
		message.channel.send({ embed: embed }).then(() => User.kick({reason: embed.fields[0].value}));
    }
}