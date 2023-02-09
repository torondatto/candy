const axios = require('axios')
const { stripIndent } = require('common-tags')
const { MessageEmbed } = require('discord.js')


module.exports = {
    name: 'instagram',
    category: 'fun',
    aliases: ['i'],
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('Vui lòng nhập tên intagram của bạn.') 
        const instagram_id = args.join(' ')
        const url = `https://www.instagram.com/${instagram_id}/?__a=1&__d=1`
        console.log(url)
        let res 
        try {
            res = await axios.get(url)
        } catch (e) {
            console.log(e)
            return message.reply('Tên Instagram của bạn không hợp lệ.')
        }

        const account = res.data.graphql.user 
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setTitle(account.full_name)
            .setURL(`https://www.instagram.com/${instagram_id}/`)
            .setThumbnail(account.profile_pic_url_hd)
            .addFields("Thông tin cá nhân", stripIndent`**- Tên người dùng: ** ${account.username}
            **- Tên đầy đủ:** ${account.full_name}
            **- Bio:** ${account.biography.length == 0 ? "Không có"  : account.biography} 
            **- Số bài đăng:** ${account.edge_owner_to_timeline_media.count}
            **- Người theo dõi:** ${account.edge_followed_by.count}
            **- Người bạn theo dõi:** ${account.edge_followed.count}
            **- Tài khoản peivate?** ${account.í_private ? "Có 🔐" : "Không 🔓"}`)

        message.channel.send(embed)
    }
} 