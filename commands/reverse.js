module.exports = {
    func: async (msg, args) => {
        function reverseString(str) {
            var splitString = str.split("");
            var reverseArray = splitString.reverse(); 
            var joinArray = reverseArray.join("");
          
      
            return joinArray; 
          }
      
          if(args[0]) {
            msg.channel.createMessage(reverseString(args[0]))
          } else {
            msg.channel.createMessage('Invalid Input.')
          }
    },
options: {
    description: "Reverse!",
    fullDescription: "Make Aurora reverse whatever you say.",
    usage: "\nUsage: \`+reverse [text to reverse]\` "
    },
   name: "reverse",
   alias: "r"
}
