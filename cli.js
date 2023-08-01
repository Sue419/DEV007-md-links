const path = require('path');
const {mdLinks} = require('./index.js');

const ruta = process.argv[2];

mdLinks(ruta)
  .then((result) => {
    console.log('Es archivo Markdown:', result === 'archivo');
    console.log('Ruta ingresada:', path.resolve(ruta));
    console.log('La ruta existe:', result);
  })
  .catch((error) => {
    console.error('Error: La ruta no existe', error.message);
  });
  
