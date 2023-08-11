const path = require('path');
const fs = require('fs');
const axios = require('axios');

// Verificar si existe la ruta y Verificar si la ruta es absoluta
const routeExists = (ruta) => {
  const rutaAbsoluta = path.resolve(ruta);
  return fs.existsSync(rutaAbsoluta);
};

// Convertir una ruta relativa a absoluta
const convertToAbsolute = (rutaRelativa) => {
  return path.resolve(rutaRelativa);
};

// Verificar si es un directorio
const isDirectory = (ruta) => {
  const stats = fs.statSync(ruta);
  return stats.isDirectory();
};

// Verificar si es un archivo Markdown
const isMarkdownFile = (ruta) => {
  return path.extname(ruta) === '.md';
};

// Función para recorrer recursivamente los directorios y subdirectorios para encontrar archivos MD
const exploreDirectory = (directory) => {
  let mdFiles = [];

  const searchMdFiles = (currentDirectory) => {
    const files = fs.readdirSync(currentDirectory);

    files.forEach((file) => {
      const filePath = path.join(currentDirectory, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        searchMdFiles(filePath);
      } else if (isMarkdownFile(filePath)) {
        mdFiles.push(path.resolve(filePath));
      }
    });
  };
  searchMdFiles(directory);
  return mdFiles;
}

const extractLinksFromFileMD = (fileContent, ruta) => {
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g; // /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g
  const links = [];

  const matches = [...fileContent.matchAll(linkRegex)];
  matches.forEach((match) => {
    const text = match[1].slice(0,50); // Acortar el texto del enlace si es demasiado largo
    const href = match[2]; // hipervínculo
    const file = ruta; // Usar la ruta del archivo para el enlace encontrado
    links.push({ file, href, text });
  });

  return links;
};

// VERIFICAR SU HTTP Y STATUS (VALIDATE)
const validateLinks = (link) => new Promise((resolve) => {
    return axios
    .get(link.href)
      .then((response) => {

        link.ok = response.status >= 200 && response.status < 400 ? 'ok' : 'fail';
        link.status = response.status;
        resolve (link);
      })
      .catch((error) => {
        link.ok = 'fail';
        link.status = error.response ? error.response.status : 'fail';
        resolve (link);
      });
});

// FUNCIÓN STATS
// En tu archivo function.js
const calculateStats = (links) => {
  const stats = {
    total: links.length, //todos los links encontrados en .md
    unique: 0, //links ok
    broken: 0, //links fail
  };

  const uniqueLinks = {}; // Objeto para almacenar enlaces únicos

  links.forEach((link) => {
    if (!uniqueLinks[link.href]) {
      uniqueLinks[link.href] = true;
      if (link.ok !== 'fail') {
        stats.unique++;
      }
    }

    if (link.ok === 'fail') {
      stats.broken++;
    }
  });

  return stats;
};

module.exports = {
  routeExists,
  convertToAbsolute,
  isDirectory,
  isMarkdownFile,
  exploreDirectory,
  extractLinksFromFileMD,
  validateLinks,
  calculateStats,
};

// /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; para validar los hipervinculos
