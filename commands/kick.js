module.exports = {
    func: async (msg, args) => {

        if(!args[0]) {
            return 'Please mention someone to kick.'
        }

    var perm = msg.channel.guild.members.get(bot.user.id).permission.has("kickMembers");
    var userperm = msg.channel.guild.members.get(msg.author.id).permission.has("kickMembers");
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
            return 'I\'m sorry, but I can\'t kick myself.'
          } else if(msg.author.id == memberid) {
            return 'Sorry, but you can\'t kick yourself.'
          } else if(msg.channel.guild.members.get(memberid).permission.has("kickMembers", "banMembers", "administrator")) {
            return 'Sorry, but you can\'t kick this member as they have permissions which allows them not to be kicked.'
          } else if(!reason) {
            bot.kickGuildMember(guildid, memberid)
            bot.createMessage(msg.channel.id, {
              embed: {
                description: `Kicked ${msg.mentions[0].username}`,
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
            bot.kickGuildMember(guildid, memberid,`${reason}`)
            bot.createMessage(msg.channel.id, {
              embed: {
                description: `Kicked ${msg.mentions[0].username} with reason **${reason}**`,
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
    description: "Kick Someone!",
    fullDescription: "Kicks a member from this server!",
    usage: "\nUsage: \`+kick\`",
    permissions: ""
    },
   name: "kick"
}
