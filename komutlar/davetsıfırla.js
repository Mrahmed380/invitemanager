const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)

  let kullanici = message.mentions.users.first();
  if (!kullanici) return message.channel.send(`Bir kullanıcı etiketlemelisiniz!`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setDescription(`${kullanici} kullanıcısının bütün davetleri silindi!`)
  .setFooter(bot.user.username, bot.user.avatarURL)
  message.channel.send(embed);

  db.delete(`davet_${kullanici.id}_${message.guild.id}`);

};

module.exports.conf = {
  aliases: ["davetsıfırla"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "davet-sıfırla",
  description: "davet-sıfırla",
  usage: "davet-sıfırla"
};
