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
  if (!fs.existsSync(ruta)) {
    return false; // La ruta no existe, retornamos falso
  }
  return fs.statSync(ruta).isDirectory();
};

// Verificar si es un archivo
const isFile = (ruta) => {
  if (!fs.existsSync(ruta)) {
    return false; // La ruta no existe, retornamos falso
  }
  return fs.statSync(ruta).isFile();
};
// /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/; --- REGEX
// Verificar si es un archivo Markdown
const isMarkdownFile = (ruta) => {
  return path.extname(ruta) === '.md';
};
console.log('Es archivo Markdown:', isMarkdownFile(process.argv[2]));

module.exports = {
  routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile,
 };
