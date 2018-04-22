module.exports = {
    func: async (msg, args) => {
        let retStr = `Requested by: ${msg.author.username}\n`;

        if(!msg.mentions.length) {
          bot.createMessage(msg.channel.id, {
            embed: {
              author: { 
                name: bot.user.username,
                icon_url: bot.user.avatarURL
              },
              image: {
                url: msg.author.avatarURL
              },
              footer: {
                text: `Aurora's Profile Picture Grabber; ${moment().format('LTS')}; ${retStr}`
              }
            }
          })
      } else {
        let user = msg.channel.guild.members.get(msg.mentions[0].id);
        bot.createMessage(msg.channel.id, {
          embed: {
            author: { 
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            image: {
              url: user.avatarURL
            },
            footer: {
              text: `Aurora's Profile Picture Grabber; ${moment().format('LTS')}; ${retStr}`
            }
          }
        })
      }
    },
options: {
    description: "Avatar!",
    fullDescription: "Grab the avatar of yourself or a user. Please Note: The images are in a 512x512px resolution.",
    usage: "\nUsage: \`+avatar\` or \`+avatar @someone\`"
    },
   name: "avatar",
   alias: "pfp"
}
