const {Client, RichEmbed} = require('discord.js');
const {token,prefix} = require('./config.json');
const fs = require('fs');
const jukebox = new Client();

// Bot iniciado con exito
jukebox.on('ready', () => {
    jukebox.user.setPresence({
        name:'musica.',
        type:'LISTENING'
    })
    console.log(`Comandos cargados: \n ${command_list}`);
});

// Lista de comandos
const command_list = [];
fs.readFileSync('./commands').forEach(file => {
    if(!file.includes('js')) return;
    command_list.push(file.replace('.js',/\ /));
});


jukebox.on('message', message => {
    // Para evitar que se use fuera de una guild
    if(!message.guild) return;
    // Si no usas el prefijo, te ignoro.
    if(message.content.indexOf(prefix) != 0 ) return;
    // ----------------------------------------------
    const args = message.content.trim().slice(prefix.length).split(" ");
    const command = args[0].toLowerCase();



});











jukebox.login(token);