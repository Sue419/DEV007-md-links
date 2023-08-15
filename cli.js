const { mdLinks } = require('./index.js');
const chalk = require('chalk');

const ruta = process.argv[2];
const optionValidate = process.argv.includes('--validate');
const optionStats = process.argv.includes('--stats');

console.log(chalk.blue(`Ruta ingresada: ${ruta}`));

mdLinks(ruta, { validate: optionValidate}, {stats: optionStats })
  .then((result) => {
    if (Array.isArray(result)) {
      console.log(chalk.green('La ruta existe'));
      if (optionStats && optionValidate) {
        console.log(chalk.yellow(`Total: ${result.length}`));
        console.log(chalk.yellow(`Unique: ${new Set(result.map((link) => link.href)).size}`));
        const brokenLinks = result.filter((link) => link.ok === 'fail').length;
        console.log(chalk.red(`Broken: ${brokenLinks}`));
      } else if (optionStats) {
        console.log(chalk.yellow(`Total: ${result.length}`));
        console.log(chalk.yellow(`Unique: ${new Set(result.map((link) => link.href)).size}`));
      } else if (optionValidate) {
        result.forEach((link) => {
          console.log(chalk.cyan(`Archivo: ${link.file}`));
          console.log(chalk.cyan(`Enlace: ${link.href}`));
          console.log(chalk.cyan(`Texto: ${link.text}`));
          console.log(chalk.magenta(`Status: ${link.status}`));
          console.log(chalk[link.ok === 'ok' ? 'green' : 'red'](`Estado: ${link.ok === 'ok' ? 'ok' : 'fail'}`));
          console.log(""); 
        });
      } else {
        result.forEach((link) => {
          console.log(chalk.cyan(`Archivo: ${link.file}`));
          console.log(chalk.cyan(`Enlace: ${link.href}`));
          console.log(chalk.cyan(`Texto: ${link.text}`));
          console.log(""); 
        });
      }
    } else if (typeof result === 'string') {
      console.log(chalk.red(`Error: ${result}`));
    } else if (result === 'archivo') {
      console.log(chalk.yellow('Es un archivo Markdown'));
    } else if (result === 'directorio') {
      console.log(chalk.yellow('Es un directorio'));
    } 
  })
  .catch((error) => {
    console.error(chalk.red('Error:', error.message));
  });
