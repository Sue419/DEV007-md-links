const { mdLinks } = require('./index.js');

const ruta = process.argv[2];
const options = {
  validate: process.argv.includes('--validate'), // Verificar si está presente --validate
  stats: process.argv.includes('--stats'),       // Verificar si está presente --stats
};

console.log('Ruta ingresada:', ruta);

mdLinks(ruta, options)
  .then((result) => {
    if (Array.isArray(result)) {
      console.log('La ruta existe');
      if (options.stats) {
        console.log(`Total: ${result.length}`);
        console.log(`Unique: ${new Set(result.map((link) => link.href)).size}`);
        const brokenLinks = result.filter((link) => link.ok === 'fail').length;
        console.log(`Broken: ${brokenLinks}`);
      } else {
        result.forEach((link) => {
          console.log(`Archivo: ${link.file}`);
          console.log(`Enlace: ${link.href}`);
          console.log(`Texto: ${link.text}`);
          console.log(`Status: ${link.status}`);
          console.log(`Estado: ${link.ok === 'ok' ? 'ok' : 'fail'}`);
          console.log(""); 
        });
      }
    } else if (typeof result === 'string') {
      console.log(result);
    } else if (result === 'archivo') {
      console.log('Es un archivo Markdown');
    } else if (result === 'directorio') {
      console.log('Es un directorio');
    } 
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
