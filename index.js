const { routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile, exploreDirectory, extractLinksFromFile } = require('./function.js');

const mdLinks = (ruta, options) => {
  return new Promise((resolve, reject) => {
    // Verificar que la ruta existe
    const existRoute = routeExists(ruta);
    console.log('Ruta existe', existRoute);
    // Si no existe se rechaza la promesa y finaliza el proceso
    if (!existRoute) {
      reject(new Error('La ruta no existe.'));
      return;
    }

    // Verificar si la ruta es absoluta y, si no lo es, convertirla a absoluta
    if (!isAbsolute(ruta)) {
      ruta = convertToAbsolute(ruta);
    }

    const linksArray = []; // Array para almacenar los enlaces encontrados

    if (isDirectory(ruta)) {
      // Si la ruta es un directorio
      console.log('Es un directorio');
      // Llamar a la función para explorar recursivamente los archivos en el directorio
      exploreDirectory(ruta, linksArray);
      resolve(linksArray); // Resolvemos la promesa con el array de enlaces encontrados
    } else if (isMarkdownFile(ruta)) {
      console.log('Es un archivo Markdown:', ruta);
      // Buscar los enlaces en el archivo directamente 
      const fileContent = fs.readFileSync(ruta, 'utf8');
      const links = extractLinksFromFile(fileContent, ruta); // Aquí la ruta del archivo está como segundo argumento
      linksArray.push(...links);
      resolve(linksArray); // Resolvemos la promesa con el array de enlaces encontrados
    } else {
      // Si no se cumple ninguna de las condiciones anteriores, algo inesperado ocurrió
      reject(new Error('La ruta no es un archivo, tampoco es un directorio ni un archivo Markdown válido.'));
    }
  });
};

module.exports = {
  mdLinks,
};
