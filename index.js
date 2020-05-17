const fs = require('fs');
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();

const { prefix, token } = require('./config.json');

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('On');
    client.user.setActivity('yxhyx\'s back', { type: 'WATCHING' });
    client.user.setStatus('online');
});

client.login(token);

function getUserFromMention(mention) {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length)
    {
        return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        let reply = `You didn't provide any arguments, ${message.author}!`;

        if (command.usage)
        {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
        }

        return message.channel.send(reply);
    }

    if (command.guildOnly && message.channel.type !== 'text')
    {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(message.author.id))
    {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime)
        {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }
    }
    try {
        command.execute(message, args, client);
    }
    catch (error)//error)
    {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});