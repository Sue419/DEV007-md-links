const path = require('path');
const routeExists = require('./index.js');

// Verificar si la ruta es absoluta
const isAbsolutePath = (path) => {
  return path.isAbsolute(path);
};
console.log('Es ruta absoluta:', isAbsolutePath());

// Verificar si es un archivo Markdown
const isMarkdownFile = (path) => {
  return path.extname(path) === '.md';
};
console.log('Es archivo Markdown:', isMarkdownFile());
