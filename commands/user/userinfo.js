module.exports = {
    name: 'userinfo',
    category: 'user',
    aliases: ['info'],
    description: 'User information',
    usage: '!info <@tag, id>',
    run: async (client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])  || message.member;
        const join = formatDate(member.joinAt)
        let roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter(r => r.id != message.guild.id)
            .map(r => r.name)
        roles = roles.join(", ")
        return message.reply(join + ", " + roles)
    }
}

function formatDate(date) {
    return Intl.DateTimeFormat('en-US').format(date)
}