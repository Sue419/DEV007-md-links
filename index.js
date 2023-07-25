const { error } = require('console');
const fs = require('fs');
const path = require('path');
console.log(process.argv[2]);

const routeExists = (ruta) => {
  return fs.existsSync(ruta);
};

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    //Verificar que la ruta existe
    const existRoute = routeExists(ruta);
    console.log('Ruta existe', existRoute);
    //Si no existe se rechaza la promesa y finaliza el proceso
    if (!existRoute) {
      reject(new Error('La ruta no existe.'));
      return;
    }
    resolve('Enlaces encontrados');
    // Si es que no se puede...se rechaza la operación
    // reject(new Error('Ocurrió un error'));
  })
}
const getFilesandDirectory =
fs.stat(ruta, (error, stats) => {
  if (error) {
    reject(error);
  } else {
    if (stats.isFile()) {
      resolve('archivo');
    } else if (stats.isDirectory()) {
      resolve('directorio');
    } else {
      resolve('otro'); // Si no es ni archivo ni directorio
    }
  }
});

module.exports = {
 mdLinks,
};
