const fs = require('fs');
const chalk = require('chalk')
const {
  routeExists,
  convertToAbsolute,
  isDirectory,
  isMarkdownFile,
  exploreDirectory,
  extractLinksFromFileMD,
  validateLinks,
  calculateStats,
} = require('./function.js');


const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    if (!routeExists(ruta)) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    const absoluteRoute = convertToAbsolute(ruta);

    if (isDirectory(absoluteRoute)) {
      const mdFiles = exploreDirectory(absoluteRoute);
      //console.log(chalk.blue('Es un directorio'));
      const allLinks = [];

      mdFiles.forEach((file) => {
        const fileContent = fs.readFileSync(file, 'utf8');
        const linksInFile = extractLinksFromFileMD(fileContent, file);
        allLinks.push(...linksInFile);
      });

      if (allLinks.length === 0) {
        resolve([]); // No hay enlaces, resolvemos con un arreglo vacío
        return;
      }

      // Opciones para validar y estadísticas
      if (options.validate && options.stats) {
        const validatedLinksPromises = allLinks.map(validateLinks);
        Promise.all(validatedLinksPromises)
          .then((validatedLinks) => {
            const stats = calculateStats(validatedLinks);
            resolve({
              validatedLinks,
              stats: {
                total: stats.total,
                unique: stats.unique,
                broken: stats.broken,
              },
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else if (options.validate) {
        const validatedLinksPromises = allLinks.map(validateLinks);
        Promise.all(validatedLinksPromises)
          .then((validatedLinks) => {
            resolve(validatedLinks);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (options.stats) {
        const stats = calculateStats(allLinks);
        resolve({
          stats: {
            total: stats.total,
            unique: stats.unique,
          },
        });
      } else {
        resolve(allLinks);
      }

    } else if (isMarkdownFile(absoluteRoute)) {
      const fileContent = fs.readFileSync(absoluteRoute, 'utf8');
      const linksInFile = extractLinksFromFileMD(fileContent, absoluteRoute);

      // Opciones para validar y estadísticas
      if (options.validate && options.stats) {
        const validatedLinksPromises = linksInFile.map(validateLinks);
        Promise.all(validatedLinksPromises)
          .then((validatedLinks) => {
            const stats = calculateStats(validatedLinks);
            resolve({
              validatedLinks,
              stats: {
                total: stats.total,
                unique: stats.unique,
                broken: stats.broken,
              },
            });
          })
          .catch((error) => {
            reject(error);
          });
      } else if (options.validate) {
        const validatedLinksPromises = linksInFile.map(validateLinks);
        Promise.all(validatedLinksPromises)
          .then((validatedLinks) => {
            resolve(validatedLinks);
          })
          .catch((error) => {
            reject(error);
          });
      } else if (options.stats) {
        const stats = calculateStats(linksInFile);
        resolve({
          stats: {
            total: stats.total,
            unique: stats.unique,
          },
        });
      } else {
        resolve(linksInFile);
      }

    } else {
      reject(new Error('La ruta no es directorio o archivo MD.'));
      return;
    }
  });
};

module.exports = {
  mdLinks,
};