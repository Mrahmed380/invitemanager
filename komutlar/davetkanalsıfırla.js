const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)

  let kanal = await db.fetch(`davetkanal_${message.guild.id}`)

  if (!kanal) return message.channel.send(`Davet kanalı ayarlı değil!`)
  db.delete(`davetkanal_${message.guild.id}`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setFooter(bot.user.username, bot.user.avatarURL)
  .setDescription(`Davet kanalı başarıyla sıfırlandı!`);
  message.channel.send(embed);
  
};

module.exports.conf = {
  aliases: ["davetkanalsıfırla"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "davet-kanal-sıfırla",
  description: "davet-kanal-sıfırla",
  usage: "davet-kanal-sıfırla"
};
