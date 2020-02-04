exports.run = (message, voiceChannel) => {

    // Default import 
    const { jukebox, buildEmbed } = require('../jukebox.js');

    // --------------

    // Entrar al canal de voz
    message.member.voiceChannel.join();
}