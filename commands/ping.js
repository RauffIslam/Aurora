module.exports = {
    func: async (msg, args) => {
        let initTime = Date.now();

  msg.channel.createMessage("Pong!")
    .then(editMSG => {
      editMSG.edit({
        embed: {
          title: `\nPong! :ping_pong: `,
          description:`\n${Date.now() - initTime} ms`,
          author: { 
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          color: 0xfa91b8,
          footer: {
            text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
          }
        }
      })
    })
   },
options: {
    description: "Ping!",
    fullDescription: "Check if Aurora is working",
    usage: "\nUsage: \`+ping\`"
    },
   name: "ping"
}
