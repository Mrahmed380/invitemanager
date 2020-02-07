const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log(`Sorun yok...`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
const Jimp = require("jimp");
const db = require("quick.db");
require("moment-duration-format");

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(aliases => {
      client.aliases.set(aliases, props.help.name);
    });
  });
});

client.on("message", message => {
 let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }

})

client.on("ready", () => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
  client.user.setStatus("online");
  client.user.setActivity(`${prefix}yardım | ${client.users.size} kullanıcıya hizmet veriyor`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Oyun ismi ayarlandı!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Şu an ` + client.channels.size + ` adet kanala, ` + client.guilds.size + ` adet sunucuya ve ` + client.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() + ` kullanıcıya hizmet veriliyor!`);
})

client.elevation = message => {
  if (!message.guild) return;
  let permlvl = 0;
  if (message.member.hasPermission("KICK_MEMBERS")) permlvl = 1;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});





const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on("guildMemberAdd", async member => {
  member.guild.fetchInvites().then(async guildInvites => {
    let rol1 = await db.fetch(`rol1_${member.guild.id}`);
    let roldavet1 = await db.fetch(`roldavet1_${member.guild.id}`);
    let roldavet2 = await db.fetch(`roldavet2_${member.guild.id}`);
    let rol2 = await db.fetch(`rol2_${member.guild.id}`);
    let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
    if (!kanal) return;
    const ei = invites[member.guild.id];

    invites[member.guild.id] = guildInvites;

    const invite = guildInvites.find(i => ei.get(i.code).inviter.id == i.inviter.id);
    const daveteden = member.guild.members.get(invite.inviter.id);

    db.add(`davet_${invite.inviter.id}_${member.guild.id}`, +1);
    db.set(`bunudavet_${member.id}`, invite.inviter.id);
    let davetsayiv2 = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    let davetsayi;
    if (!davetsayiv2) davetsayi = 0;
     else davetsayi = await db.fetch(`davet_${invite.inviter.id}_${member.guild.id}`);

    client.channels.get(kanal).send(`\`\`${member.user.tag}\`\` sunucuya katıldı!. Davet Eden: \`\`${daveteden.user.tag}\`\`; Toplam davet sayısı \`\`${davetsayi}\`\`oldu!`);
    if (!rol1) return;

    if (!daveteden.roles.has(rol1)) {
      if (davetsayi => roldavet1) {
        daveteden.addRole(rol1);
        return;
      }
    } else {
      if (!rol2) return;
      if (davetsayi => roldavet2) {
        daveteden.addRole(rol2);
        return;
      }
    }
  });
});



client.on("guildMemberRemove", async member => {
  let kanal = await db.fetch(`davetkanal_${member.guild.id}`);
  if (!kanal) return;
  let rol1 = await db.fetch(`rol1_${member.guild.id}`);
  let roldavet1 = await db.fetch(`roldavet1_${member.guild.id}`);
  let roldavet2 = await db.fetch(`roldavet2_${member.guild.id}`);
  let rol2 = await db.fetch(`rol2_${member.guild.id}`);
  let davetçi = await db.fetch(`bunudavet_${member.id}`);
  const daveteden = member.guild.members.get(davetçi);
  db.add(`davet_${davetçi}_${member.guild.id}`, -1);
  let davetsayi = await db.fetch(`davet_${davetçi}_${member.guild.id}`);
  
  if (!davetçi) {
    return client.channels.get(kanal).send(`\`\`${member.user.tag}\`\` sunucuya katıldı!. Davet Eden: \`\`Bulunamadı!\`\``);
  } else {
    client.channels.get(kanal).send(`\`\`${member.user.tag}\`\` sunucuya katıldı!. Davet Eden: \`\`${daveteden.user.tag}\`\`; Toplam davet sayısı \`\`${davetsayi}\`\`oldu!`);

    if (!rol1) return;

    if (daveteden.roles.has(rol1)) {
      if (davetsayi <= roldavet1) {
        return daveteden.removeRole(rol1);
      }
    }
    if (daveteden.roles.has(rol2)) {
      if (!rol2) return;
      if (davetsayi <= roldavet2) {
        return daveteden.removeRole(rol2);
      }
    }
  }
});

client.login("token")
