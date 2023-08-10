const { mdLinks } = require('./index.js');

const ruta = process.argv[2];
const validateOption = process.argv.includes('--validate'); // Verifica si la opción --validate está presente
console.log('Ruta ingresada:', ruta);

mdLinks(ruta, { validate: validateOption })
  .then((result) => {
    if (result === 'La ruta no existe.') {
      console.error('Error:', result);
    } else if (Array.isArray(result)) {
      console.log('La ruta existe');
      result.forEach((link) => {
        console.log(`Archivo: ${link.file}`);
        console.log(`Enlace: ${link.href}`);
        console.log(`Texto: ${link.text}`);
        console.log(`Status: ${link.status}`);
        console.log(`Estado: ${link.ok === 'ok' ? 'ok' : 'fail'}`); // Muestra "ok" o "fail" según el valor de link.ok
        console.log(""); 
      });
    } else if (typeof result === 'string') {
      console.log(result);
    } else if (result === 'archivo') {
      console.log('Es un archivo Markdown');
    } else if (result === 'directorio') {
      console.log('Es un directorio');
    } 
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });