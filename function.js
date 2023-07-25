const path = require('path');
const mdLinks = require('./index.js');

// Verificar si existe la ruta 

// Verificar si la ruta es absoluta
const isAbsolute = (ruta) => {
  return path.isAbsolute(ruta);
};
console.log('Es ruta absoluta:', isAbsolute(process.argv[2]));

// Verificar si es un archivo Markdown
const isMarkdownFile = (path) => {
  return path.extname(path) === '.md';
};
console.log('Es archivo Markdown:', isMarkdownFile(process.argv[2]));

