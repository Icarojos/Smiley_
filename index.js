const express = require('express') 
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

const { Client, Collection } = require("discord.js");
const Discord = require("discord.js") 
const client = new Client({
    intents: 32767,
});
const db = require("quick.db") 
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

//antiCrash
process.on("uncaughtException", (err, origin) => {
        console.log(' [ ANTICLASH] | CATCH ERROR');
        console.log(err, origin);
    })
//____________________//
process.on('multipleResolves', (type, promise, reason) => {
        console.log(' [ ANTICLASH ] | VÁRIOS ERROS');
        console.log(type, promise, reason);
    });
//status
client.on("ready", () => {
    let ferinha = [
        `Atualmente em ${client.guilds.cache.size} servidores`,
        `Peça ajuda com: /help`,
        `Gerenciando ${client.users.cache.size} pessoas`
      ],
      fera = 0;
    setInterval( () => client.user.setActivity(`${ferinha[fera++ % ferinha.length]}`, {
          type: "PLAYING" //mais tipos: WATCHING / LISTENING
        }), 1000 * 30); 
    client.user
        .setStatus("online")
  console.log("Estou pronto(a) para ser utilizado(a)!")
  });

client.on("guildCreate", async (guild) => {
    let embed = new MessageEmbed()
    .setTitle("Entrei em um novo servidor!")
    .setColor("GREEN")
    .addFields(
        {name: "Nome", value: `\`\`\`${guild.name}\`\`\``},
        {name: "Membros", value: `\`\`\`${guild.memberCount}\`\`\``},
    )
    client.channels.cache.get("923321935507628033").send({ embeds: [embed] })
})
client.on("guildDelete", async (guild) => {
    let embed = new MessageEmbed()
    .setTitle("Sai de um servidor!")
    .setColor("RED")
    .addFields(
        {name: "Nome", value: `\`\`\`${guild.name}\`\`\``},
        {name: "Membros", value: `\`\`\`${guild.memberCount}\`\`\``},
    )
    client.channels.cache.get("923321935507628033").send({ embeds: [embed] })
}) 

client.on("messageCreate", message => {

let user = message.author; 
  const embedbb = new Discord.MessageEmbed()
  .setAuthor(`${client.user.username}`)
  .setDescription(`**Olá, ${message.author} !\Sou o ${client.user.username}, precisa de ajuda?\**`)
    .addField("🙋 Prefixo:", `sou um bot feito em \`\`\`SlashCommands [/]\`\`\``)
    .addField("Comandos:", `Tenho diversos comandos entre \`\`\`Administração, informação, diversão e economia\`\`\`, use /help para vê-los!`)
    .addField("Convite:", `[Clique aqui](https://discord.com/api/oauth2/authorize?client_id=910238267155292201&permissions=8&scope=bot%20applications.commands)`)
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
  .setColor('YELLOW')
    
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) { return message.reply({ embeds: [embedbb]})
}
}); 

client.login(process.env.TOKEN);
