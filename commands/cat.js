const lorempixel = require("random-cat");
const catNames = require("cat-names");
const catFacts = require("cat-facts");

module.exports = {
    func: async (msg, args) => {
        if(args[0] == "picture") {
            var url = lorempixel.get({
          width: 400,
          height: 600
        });
            bot.createMessage(msg.channel.id, {
          embed: {
            title: `\nMeow! :cat:`,
            author: { 
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            image: {
              url: url
            },
            footer: {
              text: `Aurora's Random Cat Picture Generator; ${moment().format('LTS')}`
            }
          }
        })
        } else if(args[0] == "name") {
        var name = catNames.random();
        msg.channel.createMessage(`${name}`)
        } else if(args[0] == "fact") {
        var randomFact = catFacts.random();
        msg.channel.createMessage(`${randomFact}`)
      } else {
        return 'Please specify whether you want a picture, a name, or a fact. \nUsage: +cat <picture, fact, name>'
      }
    },
options: {
    description: "All Things Cat!",
    fullDescription: "Get a picture, a fact, or even a name.",
    usage: "\nUsage: \`+cat picture\` or \`+cat name\` \`+cat fact\`"
    },
   name: "cat"
}
