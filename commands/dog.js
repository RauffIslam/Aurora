const randomPuppy = require("random-puppy");
const dogFacts = require("dog-facts");
const dogNames = require("dog-names");

module.exports = {
    func: async (msg, args) => {
        if(args[0] == "picture") {
            randomPuppy().then(url => {
              bot.createMessage(msg.channel.id, {
                embed: {
                  title: `Woof! :dog:\n`,
                  author: { 
                    name: bot.user.username,
                    icon_url: bot.user.avatarURL
                  },
                  image: {
                    url: url
                  },
                  footer: {
                    text: `Aurora's Random Dog Picture Generator; ${moment().format('LTS')}`
                  }
                }
              })
            })
          } else if(args[0] == "fact") {
            var randomFact = dogFacts.random();
              msg.channel.createMessage(`${randomFact}`)
          } else if(args[0] == "name") {
            var name = dogNames.allRandom();
              msg.channel.createMessage(`${name}`)
          } else {
            msg.channel.createMessage('Please specify whether you want a picture, a name, or a fact. \nUsage: +dog <picture, fact, name>')
          }
    },
options: {
    description: "All Things Dog!",
    fullDescription: "Get a dog picture, fact, or even a name.",
    usage: "\nUsage: \`+dog picture\` or \`+dog name\` or \`+dog fact\`"
    },
   name: "dog"
}
