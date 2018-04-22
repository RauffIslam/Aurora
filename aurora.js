// Constants
const Eris = require("eris");
const moment = require("moment");
const config = require("./config.json");
const fs = require("fs");

// Command Loader
    //much thanks to jtsshieh and DAPI in general
fs.readdir('./commands', (err, files) => {
    if (err) console.error(err);
    console.log(`Attempting to load a total of ${files.length} commands into the memory.`);
    files.forEach(file => {
      try {
        const command = require(`./commands/${file}`);
        console.log(`Loading command "${command.name}".`);
        bot.registerCommand(command.name,command.func, command.options);
        if(!command.alias){
        } else {
            bot.registerCommandAlias(command.alias, command.name)
            console.log(`${command.name}: Binded ${command.alias} to ${command.name}`)
        }
      }
      catch (err) {
        console.log('An error has occured trying to load a command. Here is the error. \n\nIf the error is about an alias, dont worry about it.');
        console.log(err.stack);
      }
    });
    console.log('Command Loading complete!');
    console.log('\n');
  });

//Actual Bot
var bot = new Eris.CommandClient(config.bot_token, {
    defaultImageFormat: "png",
		defaultImageSize: 512
}, {
    description: "The prettiest bot for discord.",
    owner: "Rauf#9245",
    prefix: config.prefix,
    defaultHelpCommand: true,
});

// globals
global.bot = bot;
global.moment = moment;
global.config = config;

bot.on("ready", async () => { // When the bot is ready
    if(bot.guilds.map.length = "1") {
      var serverAmount = "Server"
    } else {
      var serverAmount = "Servers"
    }
    console.log(`Ready for use on ${moment().format('LL')} at ${moment().format('LTS')} in ${bot.guilds.map.length} ${serverAmount}.`); // Log "Ready!"
    bot.editStatus("online", {
      name: ` in ${bot.guilds.map.length} ${serverAmount}.`,
      type: 3,
      url: "https://github.com/RauffIslam/Aurora"
    })
  });

// Get The Bot To Discord
bot.connect();
module.exports = bot;