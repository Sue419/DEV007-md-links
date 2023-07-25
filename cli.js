const {mdLinks} = require('./index.js');

mdLinks(process.argv[2])
  .then((result) => {
    console.log('La ruta existe', result);
  })
  .catch((error) => {
    console.error('Error: La ruta no existe', error.message);
  });
  
  /* .then((type) => {
    console.log(`La ruta es un ${type}.`);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  }); */