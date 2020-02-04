// Default import 
const { jukebox, buildEmbed } = require('../jukebox.js');
if (!message.member.voiceChannel) {
    message.channel.send(buildEmbed({
        title: 'Debes estar en un canal de voz para poder usar este comando.',
        color: 'fa7e73'
    })
    );
    return;
}
    // --------------