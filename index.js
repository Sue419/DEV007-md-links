const fs = require('fs');
const {
  routeExists, convertToAbsolute, isDirectory, isMarkdownFile,
  exploreDirectory, extractLinksFromFileMD,
  validateLinks, calculateStats,
} = require('./function.js');

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    if (routeExists(ruta)) {
      const absoluteRoute = convertToAbsolute(ruta);

      if (isDirectory(absoluteRoute)) {
        console.log('La ruta existe.');

        if (isDirectory(absoluteRoute)) {
          console.log('Es un directorio.');

          const mdFiles = exploreDirectory(absoluteRoute);

          if (mdFiles.length === 0) {
            console.log('La carpeta está vacía.');
            resolve([]); // No hay enlaces, resolvemos con un arreglo vacío
            return;
          }

          console.log(`Se encontraron ${mdFiles.length} archivos .md:`);
          mdFiles.forEach((file) => {
            console.log(file);
          });

          const allLinks = [];
          mdFiles.forEach((file) => {
            const fileContent = fs.readFileSync(file, 'utf8');
            const linksInFile = extractLinksFromFileMD(fileContent, file);

            if (linksInFile.length === 0) {
              console.log(`El archivo ${file} no contiene enlaces.`);
            } else {
              allLinks.push(...linksInFile);
            }
          });

          if (allLinks.length === 0) {
            console.log('No se encontraron enlaces en los archivos .md.');
            resolve([]); // No hay enlaces, resolvemos con un arreglo vacío
            return;
          }

          console.log('Links encontrados en los archivos .md:');
          allLinks.forEach((link) => {
            console.log(`Archivo: ${link.file}`);
            console.log(`Enlace: ${link.href}`);
            console.log(`Texto: ${link.text}`);
            console.log("");
          });

          // Puedes verificar y validar los links aquí si es necesario
          if (options && options.validate) {
            const validatedLinksPromises = allLinks.map((link) => validateLinks(link));
            Promise.all(validatedLinksPromises)
              .then((validatedLinks) => {
                console.log('Links validados:');
                validatedLinks.forEach((link) => {
                  console.log(`Enlace: ${link.href}`);
                  console.log(`Estado: ${link.ok}`);
                  console.log(`Status: ${link.status}`);
                  console.log("");
                });

                // Puedes calcular las estadísticas aquí si es necesario
                if (options.stats) {
                  const stats = calculateStats(validatedLinks);
                  console.log('Estadísticas de los links:');
                  console.log(`Total: ${stats.total}`);
                  console.log(`Únicos: ${stats.unique}`);
                  console.log(`Rotos: ${stats.broken}`);
                }

                resolve(validatedLinks);
              })
              .catch((error) => {
                reject(error);
              });
          } else {
            resolve(allLinks);
          }
        }
      } else if (isMarkdownFile(absoluteRoute)) {
        const fileContent = fs.readFileSync(absoluteRoute, 'utf8');
        const linksInFile = extractLinksFromFileMD(fileContent, absoluteRoute);

        if (options && options.validate) {
          const validatedLinksPromises = linksInFile.map((link) => validateLinks(link));
          Promise.all(validatedLinksPromises)
            .then((validatedLinks) => {
              resolve(validatedLinks);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(linksInFile);
        }
      } else {
        reject(new Error('La ruta no es archivo, directorio, o archivo MD.'));
      }
    } else {
      reject(new Error('La ruta no existe.'));
    }
  });
};

module.exports = {
  mdLinks,
};
