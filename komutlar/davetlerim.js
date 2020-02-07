const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

exports.run = async (client, message, args, tools) => {
  let kişi;
  if (message.mentions.members.first()) kişi = message.mentions.members.first();
  else kişi = message.author;

  let davetv2 = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  let davet;
  if (!davetv2) {
    davet = 0;
  } else {
    davet = await db.fetch(`davet_${kişi.id}_${message.guild.id}`);
  }
  let rol1 = await db.fetch(`rol1_${message.guild.id}`);
  let roldavet1 = await db.fetch(`roldavet1_${message.guild.id}`);
  let roldavet2 = await db.fetch(`roldavet2_${message.guild.id}`);
  let rol2 = await db.fetch(`rol2_${message.guild.id}`);
  if (!rol1) {
    const embed = new Discord.RichEmbed()
    .addField(`Kullanıcı`, `<@` + kişi.id + `>`, true)
    .addField(`Toplam Davet:`, davet, true)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
  }
  if (message.member.roles.has(rol2)) {
    const embed = new Discord.RichEmbed()
    .addField(`Kullanıcı`, `<@` + kişi.id + `>`, true)
    .addField(`Toplam Davet:`, davet, true)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
  }
  if (!message.member.roles.has(rol1)) {
    const embed = new Discord.RichEmbed()
    .addField(`Kullanıcı`, `<@` + kişi.id + `>`, true)
    .addField(`Toplam Davet:`, davet, true)
    .setColor("RANDOM")
    .setDescription(`${message.guild.roles.get(rol1).name} rolü için son ${roldavet1 - davet} davet!`);
    message.channel.send(embed);
  }
  if (message.member.roles.has(rol1)) {
    if (!rol2) {
      const embed = new Discord.RichEmbed()
      .addField(`Kullanıcı`, `<@` + kişi.id + `>`, true)
      .addField(`Toplam Davet:`, davet, true)
      .setColor("RANDOM")
      .setFooter(client.user.username, client.user.avatarURL);
      message.channel.send(embed);
    }
    if (rol2) {
      const embed = new Discord.RichEmbed()
      .addField(`Kullanıcı`, `<@` + kişi.id + `>`, true)
      .addField(`Toplam Davet:`, davet, true)
      .setColor("RANDOM")
      .setDescription(`${message.guild.roles.get(rol2).name} rolü için son ${roldavet2 - davet} davet!`);
      message.channel.send(embed);
    }
  }
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["davetlerim"],
  permLevel: 0
};

module.exports.help = {
  name: "davetlerim",
  description: "davetlerim",
  usage: "davetlerim"
};
