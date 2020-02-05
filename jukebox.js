const { Client, MessageEmbed} = require('discord.js');
const Discord = require('discord.js');
const { token, prefix } = require('./config.json');
const fs = require('fs');
const jukebox = new Client();
module.exports = {
    'jukebox': jukebox,
    'fs': fs,
    'buildEmbed': function (config) {
        let embed = new MessageEmbed();
        if (config.color) embed.setColor(config.color);
        if (config.footer) embed.setFooter(config.footer);
        if (config.author) embed.setAuthor(config.author);
        if (config.description) embed.setDescription(config.description);
        if (config.title) embed.setTitle(config.title);
        if (config.image) embed.setImage(config.image);
        if (config.thumb) embed.setThumbnail(config.thumb);
        if (config.attach) {
            let file = new Discord.Attachment(config.attach, 'output.txt');
            embed.attachFiles([file]);
        }
        if (config.fields) config.fileds.forEach(field => {
            embed.addField(field.title, field.content);
        });
        if (config.length < 1) throw "No hay configuración para el Embed!";
        return embed;
      
    },
    'server_queue': new Set()
}

let { buildEmbed } = require('./jukebox.js')

// Bot iniciado con exito
jukebox.on('ready', () => {
    jukebox.user.setPresence({
        name: 'musica.',
        type: 'LISTENING'
    })
    console.log(`Comandos cargados:`);
    console.log(command_list);
});

// Lista de comandos
const command_list = new Set();
fs.readdirSync('./commands').forEach(file => {
    if (!file.includes('js')) return;
    command_list.add(file.replace('.js', ""));
});


jukebox.on('message', message => {
    // Para evitar que se use fuera de una guild
    if (!message.guild) return;
    // Si no usas el prefijo, te ignoro.
    if (message.content.indexOf(prefix) != 0) return;
    // ----------------------------------------------
    const args = message.content.trim().slice(prefix.length).split(" ");
    const command = args[0].toLowerCase();

    if (command_list.has(command)) {
        let voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            message.channel.send(buildEmbed({
                title: 'Debes estar en un canal de voz para poder usar este comando.',
                color: 'fa7e73'
            })
            );
            return;
        }
        let execute = require(`./commands/${command}.js`);
        if (voiceChannel) voiceChannel.join()
            .then(connection => {
                voiceChannel = connection;
                execute.run(message, voiceChannel, args);
                delete require.cache[require.resolve(`./commands/${command}.js`)];
            })
            .catch(err => {
                console.error(err);
            })
    } else {
        console.log(command_list.has(command))
        message.channel.send('Comando no disponible o inexistente.');
    }

});











jukebox.login(token);