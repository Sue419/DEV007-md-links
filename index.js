const fs = require('fs');
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
    if (routeExists(ruta)) {
      const absoluteRoute = convertToAbsolute(ruta);

      if (isDirectory(absoluteRoute)) {
        console.log('Es un directorio');
        
        const mdFiles = exploreDirectory(absoluteRoute);
        const links = [];

        mdFiles.forEach((file) => {
          const fileContent = fs.readFileSync(file, 'utf8');
          const linksInFile = extractLinksFromFileMD(fileContent, file);
          links.push(...linksInFile);
        });

      } else if (isMarkdownFile(absoluteRoute)) {
        const fileContent = fs.readFileSync(absoluteRoute, 'utf8');
        const linksInFile = extractLinksFromFileMD(fileContent, absoluteRoute);

        if (options && options.validate) {
          const validatedLinksPromises = linksInFile.map((link) => validateLinks(link));
          Promise.all(validatedLinksPromises)
            .then((validatedLinks) => {
              if (options.stats) {
                const stats = calculateStats(validatedLinks);
                resolve(stats);
              } else {
                resolve(validatedLinks);
              }
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve(linksInFile);
        }
      } else {
        reject(new Error('La ruta no es archivo, directorio, l archivo MD.'));
      }
    } else {
      reject(new Error('La ruta no existe.'));
    }
  });
};

module.exports = {
  mdLinks,
};
