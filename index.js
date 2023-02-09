const { Client, Collection } = require('discord.js');
require('dotenv').config();
const axios = require('axios')
const { readdirSync } = require('fs')

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"], partials: ["CHANNEL"] });



client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: 'To using !content', type: 'PLAYING'}], status: 'online'} );
});

client.commands = new Collection()
client.aliases = new Collection()
client.categories = readdirSync('./commands/')

client.on('messageCreate', async message => {
    if (message.author.bot) return
    if (!message.guild) return

    const prefix = '!';
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '1069959984990916668') {
            try {
                const res = await axios.get(`http://api.brainshop.ai/get?bid=172361&key=mAbVM05fBTsj2fFR&uid=1&msg=${encodeURIComponent(message.content)}`)
                message.reply(res.data.cnt)
            } catch (e) {
                message.channel.send('Bot lỗi, vui lòng thử lại sau!')
            }
        }
    }
    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command.length == 0) return
    let cmd = client.commands.get(command)
    if (!cmd) cmd = client.commands.get(client.aliases.get(command))
    if (cmd) cmd.run(client, message, args)
});

["cmd"].forEach(handler => {
    require(`./handler/${handler}`)(client)
})

client.login(process.env.TOKEN);