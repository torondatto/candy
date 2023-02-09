module.exports = {
    name: 'hello',
    category: 'fun',
    aliases: ['hello'],
    run: (client, message, args) => {
        message.reply('Hello! 👋')
    }
}