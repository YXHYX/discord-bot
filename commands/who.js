
/*
 * New command who
 * 
 * usage: *prefix*who @me, *prefix*who
 * 
 * return: a discord embed with infos about the tagged person, if no one is tagged returns infos about the message author
 */
module.exports = {
    name: 'who',
    description: 'Gives infos about the pinged user',
    guildOnly: true,
    cooldown: 5,
    args: true,
    usage: '<user> <role>',
	execute(message, args) {
		if (!message) return;
		let User = message.mentions.users.first() || message.author;
		if (!User) return message.reply('that user doesn\'t exist!');

		if (args[1])
		{
			switch (args[1])
			{
				case 'id':
					return message.reply(`${User.id}`);
				case 'avatar':
					return message.reply(`${User.displayAvatarURL}`);
				case 'createdAt':
					return message.reply(`${User.createdAt}`);
				case 'joinedAt':
					return message.reply(`${User.displayAvatarURL}`);
			}
		}
	
		const embedA = {
			color: 0x0099ff,
			title: `${User.tag}`,
			author:
			{
				name: 'yxhyx#2266',
			},
			thumbnail:
			{
				url: `${User.displayAvatarURL}`,
			},
			fields: [
				{
					name: 'ID',
					value: `${User.id}`,
				},
				{
					name: 'Joined at',
					value: `${message.member.joinedAt}`,
					inline: true,
				},
				{
					name: 'Created At',
					value: `${User.createdAt}`,
					inline: true,
				},
				{
					name: 'Roles',
					value: `${message.member.roles.map(r => `${r}`).join(' | ')}`,
				},
			],

			image: {
				url: `${User.displayAvatarURL}`,
			},
			timestamp: new Date(),
			footer: {
				text: 'by YXHYX#2266',
			},
		};

		message.channel.send({embed: embedA});
    },
};
