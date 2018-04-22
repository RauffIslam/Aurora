module.exports = {
    func: async (msg, args) => {
        if (args.length !== 0) {
            msg.delete(`Echo Command, Aurora`)
        
            var text = args.join(" ");
            return text;
          } else {
            return 'Invalid Input.'
          }
    },
options: {
    description: "Repeat Me!",
    fullDescription: "Have Aurora repeat whatever you say.",
    usage: "\nUsage: \`+echo [text to echo]\`"
    },
   name: "echo",
   alias: "say"
}
