const urban = require("urban");

module.exports = {
    func: async (msg, args) => {
        var showNoResult = () => {
            msg.channel.createMessage("Urban Dicitonary doesn't have anything to say 🚨");
      };
      
      var showWord = data => {
            if(data) {
                msg.channel.createMessage(`📖 **${data.word}** by ${data.author}\nLikes: ${data.thumbs_up} 👍\nLink: <${data.permalink}>\`\`\`${data.definition}\`\`\``);
            } else {
                showNoResult();
            }
      };
    
      if(!args[0]) {
        return 'Please specify a word to lookup.'
      } else {
        urban(args[0]).first(showWord);
      }
    },
options: {
    description: "Urban Dictionay. :book:",
    fullDescription: "Search for any word on urban dictionary.",
    usage: "\nUsage: \`+urban [word to search for]\`"
    },
   name: "urban",
   alias: "ud"
}
