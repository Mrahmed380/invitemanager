const Discord = require("discord.js"),
      db = require("quick.db"),
      ayarlar = require("../ayarlar.json"),
      prefix = ayarlar.prefix;

exports.run = async (bot, message, args, tools) => {
  const embed = new Discord.RichEmbed()
    .addField(`Davetler`,`\`${prefix}davet-kanal\`, \`${prefix}davet-kanal-sıfırla\`, \`${prefix}davet-ekle\`, \`${prefix}davet-sıfırla\`, \`${prefix}davet-sil\`, \`${prefix}davetlerim\`, \`${prefix}davet-oluştur\``)
    .addField(`Rütbeler`, `\`${prefix}rütbe-ekle\`, \`${prefix}rütbe-sil\`, \`${prefix}rütbe-liste\``)
    .setColor("RANDOM")
  message.channel.send(embed);
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
    name: 'davet-yardım',
    description: 'davet-yardım.',
    usage: 'davet-yardım'
}
