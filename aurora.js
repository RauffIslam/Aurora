const Eris = require("eris");
const moment = require("moment");
const unirest = require("unirest");
const config = require("./config.json");
const cmd = require("node-cmd");

// cmdlog = console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)

var bot = new Eris.CommandClient(config.bot_token, {}, {
    description: "The prettiest bot for discord.",
    owner: "Rauf#9245",
    prefix: config.prefix
});

bot.on("ready", () => { // When the bot is ready
  console.log(`Ready for use on ${moment().format('LL')} at ${moment().format('LTS')}`); // Log "Ready!"
});

// ping command
bot.registerCommand("ping", (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  let initTime = Date.now();

  msg.channel.createMessage("Pong!")
    .then(editMSG => {
      editMSG.edit(`Pong! :ping_pong: ` + `\n${Date.now() - initTime} ms`)
    })
}, {
    description: "Ping!",
    fullDescription: "Get Aurora's response time in ms."
});

// avatar command
bot.registerCommand('avatar', (msg, args) => {
    console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
    let retStr = `Requested by: **${msg.author.username}**\n`;

    if(!msg.mentions.length) {
      msg.channel.createMessage(msg.author.avatarURL);
    } else {
      let user = msg.channel.guild.members.get(msg.mentions[0].id);
      msg.channel.createMessage(user.avatarURL)
    }
    return retStr;
}, {
    description: "Avatar!",
    fullDescription: "Grab your own avatar, or the avatar of another user."
});

// time command (its in est)
bot.registerCommand('time', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
 msg.channel.createMessage(`The current time in Aurora's timezone (EST) is ${moment().format('LT')}`)
}, {
  description: "Time!",
  fullDescription: "Check what time it is for Aurora."
});

// uptime command
bot.registerCommand('uptime', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  
    var totalSeconds = process.uptime();
    var days = Math.floor((totalSeconds % 31536000) / 86400);
    var hours = parseInt(totalSeconds / 3600) % 24;
    var minutes = parseInt(totalSeconds / 60) % 60;
    var seconds = Math.floor(totalSeconds % 60);
    // uptime += days >= 1 ? `${days}d ` : '';
    // uptime += hours < 10 ? `0${hours}:` : `${hours}:`;
    // uptime += minutes < 10 ? `0${minutes}:` : `${minutes}:`;
    // uptime += seconds < 10 ? `0${seconds}` : `${seconds}`;

  msg.channel.createMessage(`Uptime: \n${days} Days \n${hours} Hours \n${minutes} Minutes \nand ${seconds} Seconds.`)
});

// hug command
bot.registerCommand('hug', (msg, args) => {
    console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  if (!msg.mentions.length) {
      msg.channel.createMessage(bot.user.mention + ' gives ' + msg.author.mention + ' a soft hug');
    } else {
      let users = [];
      for (let i = 0; i < msg.mentions.length; i++) {
        let user = msg.channel.guild.members.get(msg.mentions[i].id).id;
        users.push(`<@${user}>`);
      }
      msg.channel.createMessage(msg.author.mention + ' hugged ' + users);
    }
}, {
   description: "Hug!",
   fullDescription: "Have Aurora hug you, or hug other members."
});

// fight command
bot.registerCommand('fight', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  if (!msg.mentions.length) {
      msg.channel.createMessage(bot.user.mention + ' gives ' + msg.author.mention + ' a swift punch');
      msg.channel.createMessage(msg.author.mention + ' has lost to ' + bot.user.mention);
    } else {
      let users = [];
      for (let i = 0; i < msg.mentions.length; i++) {
        let user = msg.channel.guild.members.get(msg.mentions[i].id).id;
        users.push(`<@${user}>`);
      }
      msg.channel.createMessage(msg.author.mention + ' attacks ' + users);
    }
}, {
   description: "Fight!",
   fullDescription: "Have Aurora fight you, or fight other members."
});

// kiss command
bot.registerCommand('kiss', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  if(!msg.mentions.length) {
    msg.channel.createMessage(bot.user.mention + ' gives you a kiss ' + msg.author.mention)
    msg.channel.createMessage(`:kiss:`)
  } else {
    let users = [];
      for (let i = 0; i < msg.mentions.length; i++) {
        let user = msg.channel.guild.members.get(msg.mentions[i].id).id;
        users.push(`<@${user}>`);
      }
    msg.channel.createMessage(`${msg.author.mention} gives u a kiss ${users}`)
    msg.channel.createMessage(`:kiss:`)
  }
}, {
  description: "Kiss!",
  fullDescription: "Have Aurora kiss you, or kiss other members."
});

// animated kiss command
bot.registerCommand('a_kiss', (msg, args) => {
  var kissgifs = new Array("https://i.imgur.com/ZYV1k9M.gifv", "https://media.giphy.com/media/lTQF0ODLLjhza/giphy.gif", "https://media.giphy.com/media/dMYVHzANYb9p6/giphy.gif")
  var randomNum = Math.floor(Math.random() * kissgifs.length);
  var img = kissgifs[randomNum];

  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  if(!msg.mentions.length) {
    msg.channel.createMessage(bot.user.mention + ' gives you a kiss.      *ooh look, it\'s animated.*')
    msg.channel.createMessage(img)
  } else {
    let users = [];
      for (let i = 0; i < msg.mentions.length; i++) {
        let user = msg.channel.guild.members.get(msg.mentions[i].id).id;
        users.push(`<@${user}>`);
      }
    msg.channel.createMessage(msg.author.mention + ' gives a kiss to ' + users + '      *ooh look, it\'s animated.*')
    msg.channel.createMessage(img)
  }
}, {
   description: "An Animated Kiss!",
   fullDescription: "Have Aurora give you an animated kiss."
});

// dice command
bot.registerCommand('dice', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  var rand = Math.floor(Math.random() * Math.floor(6));

msg.channel.createMessage(`:game_die:`)
msg.channel.createMessage(`You rolled a ${rand}! `)
}, {
  description: "Dice!",
  fullDescription: "Roll a dice and see what number you get (1-6)"
});

// random number command
bot.registerCommand('rand', (msg, args) => {
 var min = args[0]
 var max = args[1]
 var rand = Math.random() * (max - min) + min

 console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)

 if(!args[0]) {
  msg.channel.createMessage('Please specify a minimum number')
 } else {
 if(!args[1]) {
  msg.channel.createMessage('Please specify a maximum number')
 }
}
if(args[0], args[1]) {
  msg.channel.createMessage(`Your random number is ${Math.round(rand)}`)
}
}, {
  description: "Random Number!",
  fullDescription: "Get a random number based on your minimum and maximum",
  usage: "\n**Usage:** +rand [min] [max] \nMin = Lowest Number \nMax = Highest Number\n"
});

// Reboot command
bot.registerCommand('reboot', (msg, args) => {
  if(msg.author.id !== "172557961133162496" ) {
    msg.channel.createMessage('Are you sure you can use this command?')
  } else {
    console.log(`Restarting Aurora as Requested by ${msg.author.username}`)
    msg.channel.createMessage('Restarting Aurora')
    cmd.run('pm2 restart aurora')
  }
});

// Shutdown command
bot.registerCommand('shutdown', (msg, args) => {
  if(msg.author.id !== "172557961133162496" ) {
    msg.channel.createMessage('Are you sure you can use this command?')
  } else {
    console.log(`Turning Off Aurora as Requested by ${msg.author.username}`)
    msg.channel.createMessage('Turning Off Aurora')
    cmd.run('pm2 stop aurora')
  }
});

bot.connect(); 
