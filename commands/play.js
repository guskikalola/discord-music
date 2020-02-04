exports.run = (message, voiceChannel, args) => {
    // Default import 
    const { jukebox, buildEmbed, server_queue,fs } = require('../jukebox.js');
    const ytdl = require('ytdl-core');
    // const broadcast = jukebox.createVoiceBroadcast();
    // --------------

    const permissions = message.member.voice.channel.permissionsFor(jukebox.user);
    if (!permissions.has('SPEAK')) {
        message.channel.send(buildEmbed({
            title: 'No tengo permiso para hablar en este canal de voz.',
            color: 'fa7e73'
        })
        );
    }
    if (!permissions.has('CONNECT')) {
        message.channel.send(buildEmbed({
            title: 'No tengo permiso para conectarme a este canal de voz.',
            color: 'fa7e73'
        })
        );
    }

    const audioOptions = { volume: 1 };
    String.prototype.playURL = async function () {
        var juke;
        return new Promise(async resolve => {
            if (this.toString().includes('https://www.youtube.com') || this.includes('https://youtu.be')) {
                console.log('Detected youtube.')
                let stream = ytdl(this.toString(), {
                    filter: 'audioonly',
                    quality: 'highestaudio'
                }, {
                    bitrate: "120000",
                    volume: 1
                });
                // broadcast.playStream(stream);
                // juke = voiceChannel.playBroadcast(broadcast);
                juke = voiceChannel.play(stream, audioOptions);
                resolve(juke)
            } else juke = voiceChannel.play(this.toString(), audioOptions);

        });
    }

    args[1].playURL().then(juke => {
    juke.on('error', e => { console.error("Error: " + e) })
    juke.on('end', reason => { console.log(reason) })
    juke.on('warn', warn => { console.log(warn) })
    })
}