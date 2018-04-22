module.exports = {
    func: async (msg, args) => {
        var rand = Math.floor(Math.random() * Math.floor(6) + Math.floor(1));
        msg.channel.createMessage(`:game_die:`)
        msg.channel.createMessage(`You rolled a ${rand}! `)
    },
options: {
    description: "Roll The Dice!",
    fullDescription: "Get a number 1-6 based on what the dice lands on.",
    usage: "\nUsage: \`+dice\`"
    },
   name: "dice"
}
