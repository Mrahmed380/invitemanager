const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`Bunu yapabilmek için gerekli yetkiye sahip değilsiniz!`)

  let kanal = message.mentions.channels.first();

  if (!kanal) return message.channel.send(`Bir kanal etiketlemelisiniz!`)
  const embed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setFooter(bot.user.username, bot.user.avatarURL)
  .setDescription(`Davet kanalı başarıyla ${kanal} olarak ayarlandı!`);
  message.channel.send(embed);

  db.set(`davetkanal_${message.guild.id}`, kanal.id);
};

module.exports.conf = {
  aliases: ["davetkanal"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "davet-kanal",
  description: "davet-kanal",
  usage: "davet-kanal"
};
