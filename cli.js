const {mdLinks} = require('./index.js');
const ruta = 'cli.js';
mdLinks(ruta)
  .then((result) => {
    console.log('La ruta existe', result);
  })
  .catch((error) => {
    console.error('Error: La ruta no existe', error.message);
  });