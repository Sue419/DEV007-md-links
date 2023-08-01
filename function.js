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

const extractLinksFromFileMD = (fileContent, route) => {
  // REGEX para encontrar enlaces Markdown en el contenido del archivo
  const linkRegex = /\[([^\]]+)\]\(([^\)]+)\)/g; 
  // /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
  const links = [];
  let match;

  while ((match = linkRegex.exec(fileContent)) !== null) {
    const text = match[1].slice(0, 80); // Acortar el texto del enlace si es demasiado largo
    const href = match[2];
    const file = route; // Usar la ruta del archivo para el enlace encontrado
    links.push({ file, href, text });
  }

  return links;
};

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