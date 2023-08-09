const fs = require('fs');
const { routeExists, isDirectory, isMarkdownFile, exploreDirectory, extractLinksFromFileMD, validateLinks } = require('./function.js');

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    // Verificar que la ruta existe
    const existRoute = routeExists(ruta);
    // Si no existe se rechaza la promesa y finaliza el proceso
    if (!existRoute) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    if (isDirectory(ruta)) {
      console.log('Es un directorio');
      // Llamar a la función para recorrer los archivos en el directorio
      const mdFiles = exploreDirectory(ruta);
      const linksPromises = mdFiles.map((mdFile) => {
        const fileContent = fs.readFileSync(mdFile, 'utf8');
        const linksArray = extractLinksFromFileMD(fileContent, mdFile);

        if (options && options.validate) {
          const validatePromises = linksArray.map((link) => validateLinks(link));
          return Promise.all(validatePromises);
        }

        return linksArray;
      });

      Promise.all(linksPromises)
        .then((linksArrays) => {
          const flattenedLinksArray = linksArrays.flat();
          if (flattenedLinksArray.length > 0) {
            resolve(flattenedLinksArray);
          } else {
            resolve('No se encontraron enlaces en los archivos Markdown.');
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else if (isMarkdownFile(ruta)) {
      console.log('Es un archivo Markdown');
      
      // Buscar los enlaces en el archivo directamente 
      const fileContent = fs.readFileSync(ruta, 'utf8');
      const linksArray = extractLinksFromFileMD(fileContent, ruta);
      
      if (options && options.validate) {
        const validatePromises = linksArray.map((link) => validateLinks(link));
        Promise.all(validatePromises)
          .then((validatedLinks) => {
            resolve(validatedLinks);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        resolve(linksArray);
      }
    } else {
      reject(new Error('La ruta no es un archivo, tampoco es un directorio ni un archivo Markdown válido.'));
    }
  });
};

module.exports = {
  mdLinks,
};
