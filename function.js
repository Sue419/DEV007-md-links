const path = require('path');
const fs = require('fs');

// Verificar si existe la ruta
const routeExists = (ruta) => {
  const rutaAbsoluta = path.resolve(ruta);
  return fs.existsSync(rutaAbsoluta);
};

// Verificar si la ruta es absoluta
const isAbsolute = (ruta) => {
  return path.isAbsolute(ruta);
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

// Verificar si es un archivo
const isFile = (ruta) => {
  return fs.statSync(ruta).isFile();
};

// Verificar si es un archivo Markdown
const isMarkdownFile = (ruta) => {
  return path.extname(ruta) === '.md';
};

// Función para recorrer recursivamente por los archivos en un directorio
const exploreDirectory = (ruta, linksArray) => {
  const files = fs.readdirSync(ruta);
  files.forEach((file) => {
    const fileOrDirectoryPath = path.join(ruta, file);
    if (isDirectory(fileOrDirectoryPath)) {
      exploreDirectory(fileOrDirectoryPath, linksArray);
    } else if (isMarkdownFile(fileOrDirectoryPath)) {
      console.log('Es un archivo Markdown:', fileOrDirectoryPath);
      //Buscar enlaces
      const fileContent = fs.readFileSync(fileOrDirectoryPath, 'utf8');
      // función para extraer los enlaces del archivo
      const links = extractLinksFromFileMD(fileContent, fileOrDirectoryPath); 
      linksArray.push(links);
    }
  });
};

const extractLinksFromFileMD = (fileContent, ruta) => {
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g;
  const links = [];

  const matches = [...fileContent.matchAll(linkRegex)];
  matches.forEach((match) => {
    const text = match[1].slice(0, 50); // Acortar el texto del enlace si es demasiado largo
    const href = match[2]; // hipervínculo
    const file = ruta; // Usar la ruta del archivo para el enlace encontrado
    links.push({ file, href, text });
  });

  return links;
};

 // /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; para validar los hipervinculos
/*const matches = fileContent.match(linkRegex);
  if (matches) {
    matches.forEach((match) => {
      const text = match[1].slice(0, 80); 
      const href = match[2];
      const file = ruta; 
      links.push({ file, href, text });
    });
  }*/

module.exports = {
  routeExists,
  isAbsolute,
  convertToAbsolute,
  isDirectory,
  isFile,
  isMarkdownFile,
  exploreDirectory,
  extractLinksFromFileMD,
};