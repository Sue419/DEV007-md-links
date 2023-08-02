const { mdLinks } = require('./index.js');

const ruta = process.argv[2];
console.log('Ruta ingresada:', ruta);

mdLinks(ruta)
  .then((result) => {
    console.log('La ruta existe:', result);
    console.log('Ruta ingresada:', ruta);
    console.log('Es archivo Markdown:', result === 'archivo');

  })
  .catch((error) => {
    console.error('Error: La ruta no existe', error.message);
  });
  
