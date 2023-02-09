const { MessageEmbed } = require('discord.js')
const { stripIndent } = require('common-tags')

module.exports = {
    name: 'help',
    category: 'user',
    aliases: ['h'],
    description: 'Hướng dẫn sài các lệnh',
    usage: '!help or !h [tên lệnh]',
    run: async (client, message, args) => {
        if (!args[0]) return getAll(client, message)
        return getCMD(client, message, args[0])
    },
}

function getAll(client, message) {
    const embed = new MessageEmbed()
        .setAuthor('Sử dụng lệnh !help or !h để xem các chi tiết')
        .setColor('RANDOM')

    const commands = (category) => {
        return client.commands
            .filter(cmd =>  cmd.category === category)
            .map(cmd => `\`${cmd.name}\``)
            .join(',')
    }
    console.log(commands)
    const info = client.categories
        .map(cat => stripIndent`**${cat[0].toUpperCase() + cat.slice(1)}** \n${commands(cat)}`)
        .reduce((string, category) => string + "\n" + category) 
    
    embed.setDescription(info)
    return message.channel.send({ embeds: [embed] })
}

function getCMD(client, message, input) {
    const embed  = new MessageEmbed()
    const cmd = client.commands.get(input.toLowerCase() || client.commands.get(client.aliases.get(input.toLowerCase())))
    let info = `Không tìm thấy lệnh **${input.toLowerCase()}**`

    if (!cmd){
        embed.setColor('RED').setDescription(info)
        return message.channel.send({ embeds: [embed] })
    }

    if (cmd.name) info = `**Tên lệnh**: ${cmd.name}`

    if (cmd.aliases) info += `\n**Tên gọi khác**: ${cmd.aliases.map(a => `\`${a}\``).join(', ')}`
    
    if (cmd.description) info += `\n**Chi tiết lệnh**: ${cmd.description}`

    if (cmd.usage) {
        info += `\n**Cách sử dụng các lệnh**: ${cmd.usage}`
        embed.setFooter(`Cú pháp: <> = Bắt buộc, [] = Không bắt buộc`)
    }

    embed.setColor("GREEN").setDescription(info)
    return message.channel.send({ embeds: [embed] })
}