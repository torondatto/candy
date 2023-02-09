const axios = require('axios')

module.exports = { 
    name: 'chat',
    category: 'fun',
    aliases: ['chat'],
    description: 'Chat with AI',
    usage: '!chat <Your comment>',
    run: async (client, message, args) => {
        try {
            const res = await axios.get(`http://api.brainshop.ai/get?bid=172361&key=mAbVM05fBTsj2fFR&uid=1&msg=${encodeURIComponent(args.join('' ))}`)
            message.reply(res.data.cnt)
        } catch (e) {
            message.channel.send('Bot lỗi, vui lòng thử lại sau!')
        }
    }
}