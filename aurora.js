const Eris = require("eris");
const moment = require("moment");
const unirest = require("unirest");
const config = require("./config.json");
const cmd = require("node-cmd");
const randomPuppy = require("random-puppy");
const dogFacts = require("dog-facts");
const dogNames = require("dog-names");
const lorempixel = require("random-cat");
const catNames = require("cat-names");
const catFacts = require("cat-facts");
const urban = require("urban");
const fs = require("fs-extra");


function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    return password;
  }
  var adminPass = `${password_generator()}`

// cmdlog = console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)

var bot = new Eris.CommandClient(config.bot_token, {
    defaultImageFormat: "png",
		defaultImageSize: 512
}, {
    description: "The prettiest bot for discord.",
    owner: "Rauf#9245",
    prefix: config.prefix,
    defaultHelpCommand: true,
});

bot.on("ready", () => { // When the bot is ready
  console.log(`Ready for use on ${moment().format('LL')} at ${moment().format('LTS')}`); // Log "Ready!"
});

// help command
bot.registerCommand('help2', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  });

// ping command
bot.registerCommand('ping', (msg, args) => {
  console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
  let initTime = Date.now();

  msg.channel.createMessage("Pong!")
    .then(editMSG => {
      editMSG.edit({
        embed: {
          title: `\nPong! :ping_pong: `,
          description:`\n${Date.now() - initTime} ms`,
          author: { 
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          color: 0xfa91b8,
          footer: {
            text: `Requested by ${msg.author.username}#${msg.author.discriminator}`
          }
        }
      })
    })
}, {
    description: "Ping!",
    fullDescription: "Get Aurora's response time in ms."
});

// dog command
bot.registerCommand('dog', (msg, args) => {
  if(!args[0]) {
    return 'Please specify whether you want a picture, a name, or a fact. \nUsage: +dog <picture, fact, name>'
  } else if(args[0] == "picture") {
    randomPuppy().then(url => {
      bot.createMessage(msg.channel.id, {
        embed: {
          title: `Woof! :dog:`,
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
});

// cat command
bot.registerCommand('cat', (msg, args) => {
	if(!args[0]) {
		return 'Please specify whether you want a picture, a name, or a fact. \nUsage: +cat <picture, fact, name>'
	} else if(args[0] == "picture") {
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
});

// reverse command
bot.registerCommand('reverse', (msg, args) => {
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
});

// echo command
bot.registerCommand('echo', (msg, args) => {
  if (args.length !== 0) {
    msg.delete(`Echo Command, Aurora`)

    var text = args.join(" ");
    return text;
  } else {
    return 'Invalid Input.'
  }
});

// avatar command
bot.registerCommand('avatar', (msg, args) => {
    console.log(`${msg.content} was ran on server ${msg.channel.guild.name} in text channel #${msg.channel.name} by ${msg.author.username}#${msg.author.discriminator}`)
    let retStr = `Requested by: ${msg.author.username}\n`;

      if(!msg.mentions.length) {
        bot.createMessage(msg.channel.id, {
          embed: {
            author: { 
              name: bot.user.username,
              icon_url: bot.user.avatarURL
            },
            image: {
              url: msg.author.avatarURL
            },
            footer: {
              text: `Aurora's Profile Picture Grabber; ${moment().format('LTS')}; ${retStr}`
            }
          }
        })
    } else {
      let user = msg.channel.guild.members.get(msg.mentions[0].id);
      bot.createMessage(msg.channel.id, {
        embed: {
          author: { 
            name: bot.user.username,
            icon_url: bot.user.avatarURL
          },
          image: {
            url: user.avatarURL
          },
          footer: {
            text: `Aurora's Profile Picture Grabber; ${moment().format('LTS')}; ${retStr}`
          }
        }
      })
    } 
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

// urban dictionary
bot.registerCommand('urban', (msg, args) => {
  var showNoResult = () => {
		msg.channel.createMessage("Wtf?! Urban Dicitonary doesn't have anything to say 🚨");
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
 } else if(!args[1]) {
  msg.channel.createMessage('Please specify a maximum number')
 }
 if(args[0], args[1]) {
  msg.channel.createMessage(`Your random number is ${Math.round(rand)}`)
}
}, {
  description: "Random Number!",
  fullDescription: "Get a random number based on your minimum and maximum",
  usage: "\n**Usage:** +rand [min] [max] \nMin = Lowest Number \nMax = Highest Number\n"
});

// ban command
bot.registerCommand('ban', (msg, args) => {
  var perm = msg.channel.guild.members.get(bot.user.id).permission.has("banMembers");
  var userperm = msg.channel.guild.members.get(msg.author.id).permission.has("banMembers");
  var memberid = msg.channel.guild.members.get(msg.mentions[0].id).id;
  var guildid = msg.channel.guild.id;
  var server = msg.channel.guild;
  var reason = args[1]

 
  if(!perm) {
    return 'Aurora does not have permission to use this command.'
  } else if(!userperm) {
    return 'Sorry, but you don\'t have the permissions to use this command. ' + msg.author.mention
  } else if(!memberid) {
    return 'Are you sure this user is in this server?'
  } else if(bot.user.id == memberid) {
    return 'I\'m sorry, but I can\'t ban myself.'
  } else if(msg.author.id == memberid){
    return 'Sorry, but you can\'t ban yourself.'
  } else if(msg.channel.guild.members.get(memberid).permission.has("banMembers", "administrator")) {
    return 'Sorry, but you can\'t ban this member as they have permissions which allows them not to be banned.'
  } else if(!reason) {
    bot.banGuildMember(guildid, memberid, 7)
    bot.createMessage(msg.channel.id, {
      embed: {
        description: `Banned ${msg.mentions[0].username}`,
        author: { 
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        color: 0xfa91b8,
        footer: {
          text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
        }
      }
    })
  } else {
    bot.banGuildMember(guildid, memberid, 7, `${reason}`)
    bot.createMessage(msg.channel.id, {
      embed: {
        description: `Banned ${msg.mentions[0].username} with reason **${reason}**`,
        author: { 
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        color: 0xfa91b8,
        footer: {
          text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
        }
      }
    })
  }
});

// kick command
bot.registerCommand('kick', (msg, args) => {
  var perm = msg.channel.guild.members.get(bot.user.id).permission.has("kickMembers");
  var userperm = msg.channel.guild.members.get(msg.author.id).permission.has("kickMembers");
  var memberid = msg.channel.guild.members.get(msg.mentions[0].id).id;
  var guildid = msg.channel.guild.id;
  var server = msg.channel.guild;
  var reason = args[1]

 
  if(!perm) {
    return 'Aurora does not have permission to use this command.'
  } else if(!userperm) {
    return 'Sorry, but you don\'t have the permissions to use this command. ' + msg.author.mention
  } else if(!memberid) {
    return 'Are you sure this user is in this server?'
  } else if(bot.user.id == memberid) {
    return 'I\'m sorry, but I can\'t kick myself.'
  } else if(msg.author.id == memberid){
    return 'Sorry, but you can\'t kick yourself.'
  } else if(msg.channel.guild.members.get(memberid).permission.has("kickMembers", "banMembers", "administrator")) {
    return 'Sorry, but you can\'t kick this member as they have permissions which allows them not to be banned.'
  } else if(!reason) {
    bot.kickGuildMember(guildid, memberid)
    bot.createMessage(msg.channel.id, {
      embed: {
        description: `Kicked ${msg.mentions[0].username}`,
        author: { 
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        color: 0xfa91b8,
        footer: {
          text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
        }
      }
    })
  } else {
    bot.kickGuildMember(guildid, memberid,`${reason}`)
    bot.createMessage(msg.channel.id, {
      embed: {
        description: `Kicked ${msg.mentions[0].username} with reason **${reason}**`,
        author: { 
          name: bot.user.username,
          icon_url: bot.user.avatarURL
        },
        color: 0xfa91b8,
        footer: {
          text: `Command executed at ${moment().format('LT')} by ${msg.author.username}#${msg.author.discriminator}`
        }
      }
    })
  }
});

// password gen
bot.registerCommand('genPass', (msg, args) => {
  function password_generator( len ) {
    var length = (len)?(len):(10);
    var string = "abcdefghijklmnopqrstuvwxyz"; //to upper 
    var numeric = '0123456789';
    var punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    var password = "";
    var character = "";
    var crunch = true;
    while( password.length<length ) {
        entity1 = Math.ceil(string.length * Math.random()*Math.random());
        entity2 = Math.ceil(numeric.length * Math.random()*Math.random());
        entity3 = Math.ceil(punctuation.length * Math.random()*Math.random());
        hold = string.charAt( entity1 );
        hold = (entity1%2==0)?(hold.toUpperCase()):(hold);
        character += hold;
        character += numeric.charAt( entity2 );
        character += punctuation.charAt( entity3 );
        password = character;
    }
    return password;
  }

msg.channel.createMessage('Sending randomly generated password to your DM\'s' + msg.author.mention)

  bot.getDMChannel(msg.author.id).then(channel => {
    channel.createMessage(`${password_generator()}`)
  })

});

// Reboot command
bot.registerCommand('reboot', (msg, args) => {

  console.log(adminPass)

  if(msg.author.id !== config.ownerID) {
    msg.channel.createMessage('Are you sure you can use this command?')
    } else if(args[0] !== adminPass) {
      msg.channel.createMessage('Incorrect Password!')
  } else {
    console.log(`Restarting Aurora as Requested by ${msg.author.username}`)
    msg.channel.createMessage('Restarting Aurora')
    cmd.run('pm2 restart aurora')
  }
});

// Shutdown command
bot.registerCommand('shutdown', (msg, args) => {

  console.log(adminPass)

  if(msg.author.id !== config.ownerID) {
    msg.channel.createMessage('Are you sure you can use this command?')
  } else if(args[0] !== adminPass) {
    msg.channel.createMessage('Incorrect Password!')
} else {
  console.log(`Restarting Aurora as Requested by ${msg.author.username}`)
  msg.channel.createMessage('Restarting Aurora')
    cmd.run('pm2 stop aurora')
  }
});

bot.connect(); 
