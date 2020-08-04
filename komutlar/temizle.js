const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    const filter = response => {
      return response.author.id == message.author.id;
    }
  if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('**Mesajları Yönet** adlı izin gerekiyor.');
  else {
    message.channel.send('Ne kadar mesaj kaldırılacak?').then(() => {
      message.channel.awaitMessages(filter, {max: 1})
      .then((eslesen) => {
      if(isNaN(eslesen.first().content)){message.channel.send('Sayı girmelisin!')} else {
       if(eslesen.first().content > 99) return message.channel.send('Maks. 99 mesaj silinebilir!')
        if(eslesen.first().content < 1) return message.channel.send('En az 1 en fazla 99 kadar mesaj silebilirsin.')
        message.channel.bulkDelete(1)
        message.channel.bulkDelete(eslesen.first().content).then(message.channel.send(eslesen.first().content + ' adet mesaj kaldırıldı.').then(i => i.delete({timeout:5000})))
      }
      })
    });
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sil','temizle','purge'],
  permLevel: 0
};

exports.help = {
  name: 'kaldır',
  description: 'by kerem.',
  usage: 'kaldır'
}