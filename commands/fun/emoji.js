const { MessageEmbed, Util } = require("discord.js")
const { parse } =  require('twemoji-parser');

module.exports = {
    name: 'emoji',
    category: 'fun',
    aliases: ['emo'],
    description: 'emoji',
    usage: '!emo or !emoji <Your Emoji>', 
    run: (client, message,  args) => {
        const emoji = args[0]
        if (!emoji) return message.reply('Nhập emoji sai rồi kìa liuliu :)')

        let custom = Util.parseEmoji(emoji)

        const embed = new MessageEmbed()
            .setTitle(`Phiên bản phóng to của emoji: ${emoji}`)
            .setColor("RANDOM")


        if (custom.id) {
            let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`
            embed.setImage(link)
                .setURL(link)
                .setFooter(`Emoji ID: ${custom.id}`)
            return message.channel.send({ embeds: [embed]})
        } else {
            let parsed = parse(emoji, {assetType: 'png'})
            if (!parsed[0]) return message.channel.send('Emoji không hợp lệ')
            embed.setImage(parsed[0].url)
            return message.channel.send({ embeds: [embed]})
        }
    }
}