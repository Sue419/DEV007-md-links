const path = require('path');
const fs = require('fs');

// Verificar si existe la ruta 
const routeExists = (ruta) => {
  return fs.existsSync(ruta);
};
// Verificar si la ruta es absoluta
const isAbsolute = (ruta) => {
  if (!path.isAbsolute(ruta)) {
    ruta = path.resolve(ruta);
  }
  return path.isAbsolute(ruta);
};

// Convertir una ruta relativa a absoluta
const convertToAbsolute = (rutaRelativa) => {
  return path.resolve(rutaRelativa);
};

// Verificar si es Directorio
const isDirectory = (ruta) => {
  try {
    const stats = fs.statSync(ruta);
    return stats.isDirectory();
  } catch (error) {
    // Si hay un error al obtener los stats, entonces no es un directorio y termina el proceso
    return false;
  }
};

// Verificar si es un archivo
const isFile = (ruta) => {
  try {
    const stats = fs.statSync(ruta);
    return stats.isFile();
  } catch (error) {
    // Si hay un error al obtener los stats, se asume que no es un archivo
    return false;
  }
};

// Verificar si es un archivo Markdown
const isMarkdownFile = (ruta) => {
  return path.extname(ruta) === '.md';
};
console.log('Es archivo Markdown:', isMarkdownFile(process.argv[2]));

module.exports = {
  routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile,
 };
