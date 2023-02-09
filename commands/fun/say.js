module.exports = {
    name: 'say',
    category: 'fun',
    aliases: ['s'],
    description: 'Say something by bot',
    usage: '!say or !s <Your Comments>',
    run: (client, message, args) => {
        if (message.deletable) message.delete();
        message.channel.send(args.join(' '));
    }
}