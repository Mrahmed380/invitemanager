const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)

  let kullanici = message.mentions.users.first();
  let sayi = args.slice(1).join(" ")
  if (!kullanici) return message.channel.send(`Bir kullanıcıyı etiketlemelisiniz!`)
  if (!sayi) return message.channel.send(`Bir miktar girmelisiniz!`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setFooter(bot.user.username, bot.user.avatarURL)
  .setDescription(`${kullanici} kullanıcısına ${sayi} adet davet eklendi!`);
  message.channel.send(embed);

  db.add(`davet_${kullanici.id}_${message.guild.id}`, +sayi);
};

module.exports.conf = {
  aliases: ["davetekle"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "davet-ekle",
  description: "davet-ekle",
  usage: "davet-ekle"
};