
const { routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile } = require('./function.js');

const folder = process.argv[2];

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

    // Verificar si la ruta es absoluta y, si no lo es, convertirla a absoluta
    if (!isAbsolute(ruta)) {
      ruta = convertToAbsolute(ruta);
    }

    if (isDirectory(ruta)) {
      // Cuando la ruta es un directorio
      console.log('Es un directorio');
      resolve('directorio');
    } else if (isMarkdownFile(ruta)) {
      // Cuando la ruta es un archivo Markdown
      console.log('Es un archivo Markdown');
      resolve('archivo');
    } else if (isFile(ruta)) {
      // Cuando la ruta es otro tipo de archivo
      console.log('Es otro tipo de archivo');
      resolve('otro');
    } else {
      // Si no se cumple ninguna de las condiciones anteriores, algo inesperado ocurrió
      reject(new Error('La ruta no es un archivo, tampo es un directorio ni un archivo Markdown válido.'));
    }
  });
};

module.exports = {
  mdLinks,
};
