module.exports = {
    func: async (msg, args) => {
        if (!args[0]) {
            msg.channel.createMessage(bot.user.mention + ' gives ' + msg.author.mention + ' a soft hug');
          } else {
            let users = [];
            for (let i = 0; i < msg.mentions.length; i++) {
              let user = msg.channel.guild.members.get(msg.mentions[i].id).id;
              users.push(`<@${user}>`);
            }
            msg.channel.createMessage(msg.author.mention + ' hugged ' + users);
          }
    },
options: {
    description: "Gives out a hug!",
    fullDescription: "Provides a user with a hug full of love.",
    usage: "\nUsage: \`+hug\` or \`+hug @someone\`"
    },
   name: "hug"
}
