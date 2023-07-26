const path = require('path');
const { routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile } = require('./function.js');

const folder = process.argv[2];

// Verificar que la ruta existe
const existRoute = routeExists(folder);
console.log('Ruta existe:', existRoute);

// Obtener la ruta absoluta si no lo es
const rutaAbsoluta = isAbsolute(folder) ? folder : convertToAbsolute(folder);
console.log('Ruta absoluta:', rutaAbsoluta);

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    // Verificar que la ruta existe
    const existRoute = routeExists(ruta);
    console.log('Ruta existe', existRoute);
    // Si no existe se rechaza la promesa y finaliza el proceso
    if (!existRoute) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    if (isDirectory(ruta)) {
      // Cuando la ruta es un directorio
      console.log('Es un directorio');
    } else if (isMarkdownFile(ruta)) {
      // Cuando la ruta es un archivo Markdown
      console.log('Es un archivo Markdown');
    } else {
      // Cuando la ruta es otro tipo de archivo
      console.log('Es otro tipo de archivo');
    }

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
  });
};

module.exports = {
  mdLinks,
};

