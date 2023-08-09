const { mdLinks } = require('./index.js');

const ruta = process.argv[2];
console.log('Ruta ingresada:', ruta);

mdLinks(ruta)
  .then((result) => {
    if (result === 'La ruta no existe.') {
      console.error('Error:', result);
    } else {
      console.log('La ruta existe');
      if (Array.isArray(result)) {
        if (result.length === 0) {
          console.log('No se encontraron enlaces en los archivos Markdown.');
        } else {
          console.log('Enlaces encontrados:');
          result.forEach((link) => {
            console.log(`Archivo: ${link.file}\nEnlace: ${link.href}\nTexto: ${link.text}\n`);
          });
        }
      } else if (result === 'archivo') {
        console.log('Es un archivo Markdown');
      } else if (result === 'directorio') {
        console.log('Es un directorio');
      } 
    }
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });

