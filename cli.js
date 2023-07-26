const { loadOptions } = require('@babel/core');
const {mdLinks} = require('./index.js');
const ruta = process.argv[2];

mdLinks(ruta, options)
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