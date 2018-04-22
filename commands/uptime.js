module.exports = {
    func: async (msg, args) => {
        var totalSeconds = process.uptime();
        var days = Math.floor((totalSeconds % 31536000) / 86400);
        var hours = parseInt(totalSeconds / 3600) % 24;
        var minutes = parseInt(totalSeconds / 60) % 60;
        var seconds = Math.floor(totalSeconds % 60);
    
      msg.channel.createMessage(`Uptime: \n${days} Days \n${hours} Hours \n${minutes} Minutes \nand ${seconds} Seconds.`)
    },
options: {
    description: "How long has the bot been awake?",
    fullDescription: "Check Aurora's uptime",
    usage: "\nUsage: \`+uptime\`"
    },
   name: "uptime"
}
