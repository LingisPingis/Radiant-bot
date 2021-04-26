const chalk = require(`chalk`);

module.exports = async (Discord, client) => {
  console.log(chalk.grey(`
╔═════════════════════════════════════════════════════════╗
║░░██████╗░░█████╗░██████╗░██╗░█████╗░███╗░░░██╗████████╗░║
║░░██╔══██╗██╔══██╗██╔══██╗██║██╔══██╗████╗░░██║╚══██╔══╝░║
║░░██████╔╝███████║██║░░██║██║███████║██╔██╗░██║░░░██║░░░░║
║░░██╔══██╗██╔══██║██║░░██║██║██╔══██║██║╚██╗██║░░░██║░░░░║
║░░██║░░██║██║░░██║██████╔╝██║██║░░██║██║░╚████║░░░██║░░░░║
║░░╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░╚═╝╚═╝░░╚═╝╚═╝░░╚═══╝░░░╚═╝░░░░║
╚═════════════════════════════════════════════════════════╝`));

const fs = require('fs')
  const categories = fs.readdirSync("./commands");
  const commandsLength = fs.readdirSync(`./commands/`).length;

  console.log(`
Loaded ${categories.length} Sub Categories!
Loaded ${commandsLength.length} Commands!
  `)

}
