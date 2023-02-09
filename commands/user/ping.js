 module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['p'],
    desription: 'Xem độ trễ của bot',
    usage: '!ping',
    run: (client, message, args) => {
        message.reply(`🏓 Pong! \`${client.ws.ping}ms\``)
    }
 }