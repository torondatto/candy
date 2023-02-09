const {AudioPlayer, createAudioResource, StreamType, entersState, VoiceConnectionStatus, joinVoiceChannel} = require("@discordjs/voice");
const discordTTS=require("discord-tts");

let voiceConnection;
let audioPlayer=new AudioPlayer();

module.exports = {
    name: 'speak',
    category: 'fun',
    aliases: ['s', 'talk'],
    description: 'Speech',
    usage: '!s or !talk <Your sense>',
    run: async (client, message, args) => {
        if (!args[0]) return message.reply('Vui lòng nhập gì đó để Candyyy nói!')
        const string = args.join(' ')
        if (string.length > 200) return message.channel.send('Vui lòng nhập dưới 200 ký tự')
        const voiceChannel = message.member.voice.channel
        if (!voiceChannel) return message.reply('Bạn phải vào voice room để sử dụng lệnh này')
       
        const stream=discordTTS.getVoiceStream(string);
        const audioResource=createAudioResource(stream, {inputType: StreamType.Arbitrary, inlineVolume:true});
        if(!voiceConnection || voiceConnection?.status===VoiceConnectionStatus.Disconnected){
            voiceConnection = joinVoiceChannel({
                channelId: message.member.voice.channelId,
                guildId: message.guildId,
                adapterCreator: message.guild.voiceAdapterCreator,
            });
            voiceConnection=await entersState(voiceConnection, VoiceConnectionStatus.Connecting, 5_000);
        }
        
        if(voiceConnection.status===VoiceConnectionStatus.Connected){
            voiceConnection.subscribe(audioPlayer);
            audioPlayer.play(audioResource);
        }
    }
}