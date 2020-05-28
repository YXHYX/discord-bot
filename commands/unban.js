/*
 * New command unban
 *
 * usage: unban userid, unban userid reason
 *
 * return: unbans someone using their id in the command message.
 */

module.exports = {
    name: 'unban',
    description: 'Unban a specific user from the server',
    guildOnly: true,
    cooldown: 5,
    usage: '<userid> <reason>',
    args: true,
    async execute(message, args) {

        function getReason() {
            if (!args[1]) return;
            let msg = '';
            for (let i = 1; i < args.length; i++) {
                msg += args[i] + " ";
            }
            return msg;
        }

        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply('You dont have permission to execute this command');

        let userid = args[0];

        userid = userid.replace("<@", "");
        userid = userid.replace(">", "");

        const banList = await message.guild.fetchBans();

        let bannedUser = banList.find(user => user.id === userid);
        if (!bannedUser) return message.reply('This user isn\'t banned!');

        var unbannedAt = new Date();
        unbannedAt = unbannedAt.getFullYear() + '-' + (unbannedAt.getMonth() + 1) + '-' + unbannedAt.getDate() + ' ' + unbannedAt.getHours() + ':' + unbannedAt.getMinutes() + ':' + unbannedAt.getSeconds();

        const embed = { 
            color: 0x0099ff,
            title: `Unbanned ${userid}.`,
            fields: [
                {
                    name: 'Reason',
                    value: 'No reason specified',
                },
                {
                    name: 'Unbanned At',
                    value: `${unbannedAt}`,
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
        
        message.channel.send({ embed: embed }).then(() => message.guild.unban(userid, [embed.fields[0].value]));
    }
}