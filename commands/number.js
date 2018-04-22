module.exports = {
    func: async (msg, args) => {
        var min = args[0]
        var max = args[1]
        var rand = Math.random() * (max - min) + min

        if(!args[0]) {
            msg.channel.createMessage('Please specify a minimum number')
           } else if(!args[1]) {
            msg.channel.createMessage('Please specify a maximum number')
           }
           if(args[0], args[1]) {
            msg.channel.createMessage(`Your random number is ${Math.round(rand)}`)
          }
    },
options: {
    description: "Random Number!",
    fullDescription: "Get yourself a random number",
    usage: "\nUsage: \`+number [minimum number] [maximum number]\`"
    },
   name: "number"
}
