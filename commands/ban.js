module.exports = {
    func: async (msg, args) => {
        
        if(!args[0]) {
            return 'Please mention someone to ban.'
        }

        var perm = msg.channel.guild.members.get(bot.user.id).permission.has("banMembers");
        var userperm = msg.channel.guild.members.get(msg.author.id).permission.has("banMembers");
        var memberid = msg.channel.guild.members.get(msg.mentions[0].id).id;
        var guildid = msg.channel.guild.id;
        var server = msg.channel.guild;
        var reason = args[1]

        
        if(!perm) {
            return 'Aurora does not have permission to use this command.'
        } else if(!userperm) {
            return 'Sorry, but you don\'t have the permissions to use this command. ' + msg.author.mention
        } else if(!memberid) {
            return 'Are you sure this user is in this server?'
        } else if(bot.user.id == memberid) {
            return 'I\'m sorry, but I can\'t ban myself.'
        } else if(msg.author.id == memberid){
            return 'Sorry, but you can\'t ban yourself.'
        } else if(msg.channel.guild.members.get(memberid).permission.has("banMembers", "administrator")) {
            return 'Sorry, but you can\'t ban this member as they have permissions which allows them not to be banned.'
        } else if(!reason) {
            bot.banGuildMember(guildid, memberid, 7)
            bot.createMessage(msg.channel.id, {
            embed: {
                description: `Banned ${msg.mentions[0].username}`,
                author: { 
                name: bot.user.username,
                icon_url: bot.user.avatarURL
                },
                color: 0xfa91b8,
                footer: {
                text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
                }
            }
            })
        } else {
            bot.banGuildMember(guildid, memberid, 7, `${reason}`)
            bot.createMessage(msg.channel.id, {
            embed: {
                description: `Banned ${msg.mentions[0].username} with reason **${reason}**`,
                author: { 
                name: bot.user.username,
                icon_url: bot.user.avatarURL
                },
                color: 0xfa91b8,
                footer: {
                text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
                }
              }
            })
          }
    },
options: {
    description: "Ban Someone!",
    fullDescription: "Bans a user in this server",
    usage: "\nUsage: \`+ban\`"
    },
   name: "ban"
}
