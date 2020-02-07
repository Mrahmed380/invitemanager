const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;
exports.run = async (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)
  let rol1 = await db.fetch(`rol1_${message.guild.id}`);
  let rol2 = await db.fetch(`rol2_${message.guild.id}`);
  let roldavet2 = await db.fetch(`roldavet2_${message.guild.id}`);
  let rol = message.mentions.roles.first();
  if (!rol) return message.channel.send(`Lütfen silinecek rütbenin rolünü etiketleyiniz!`);
  if (rol.id === rol1) {
    const embed = new Discord.RichEmbed()
    .setDescription(`Başarıyla **${message.guild.roles.get(rol1).name}** rolüne sahip rütbe silindi!`)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL);
    await db.delete(`rol1_${message.guild.id}`);
    await db.delete(`roldavet1_${message.guild.id}`);
    message.channel.send(embed);
  } else if (rol.id === rol2) {
    const embed = new Discord.RichEmbed()
    .setDescription(`Başarıyla **${message.guild.roles.get(rol2).name}** rolüne sahip rütbe silindi!`)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL);
    await db.delete(`rol2_${message.guild.id}`);
    await db.delete(`roldavet2_${message.guild.id}`);
    message.channel.send(embed);
  } else {
    const embed = new Discord.RichEmbed()
    .setDescription(`Böyle bir rütbe bulunamadı!`)
    .setColor("RANDOM")
    .setFooter(client.user.username, client.user.avatarURL);
    message.channel.send(embed);
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};
exports.help = {
  name: "rütbe-sil",
  description: "rütbe-sil",
  usage: "rütbe-sil"
};
