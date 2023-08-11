const path = require('path');
const {
  routeExists,
  convertToAbsolute,
  isDirectory,
  isMarkdownFile,
  exploreDirectory,
  extractLinksFromFileMD,
  validateLinks,
  calculateStats,
} = require('../function.js'); 

//
  describe('routeExists verifica si una ruta existe', () => {
    it('debe devolver true para un directorio existente', () => {
      const result = routeExists('test/Prueba'); //Ruta de prueba
      expect(result).toBe(true);
    });

    it('debe devolver false para un directorio no existente', () => {
      const result = routeExists('ruta-no-existente');
      expect(result).toBe(false);
    });
  });

  describe('convertToAbsolute', () => {
    it('debe convertir una ruta relativa a una ruta absoluta', () => {
      const rutaRelativa = './archivo.txt';
      const rutaAbsoluta = convertToAbsolute(rutaRelativa);
      expect(path.isAbsolute(rutaAbsoluta)).toBe(true);
    });
  });

  describe('isDirectory', () => {
    it('debe retornar true si es un directorio', () => {
      const directoryPath = 'C:\\Users\\USER\\Desktop\\DEV007-md-links\\test\\Prueba';
      expect(isDirectory(directoryPath)).toBe(true);
    });
    it('debe retornar false si no es un directorio', () => {
      const filePath = 'C:\\Users\\USER\\Desktop\\DEV007-md-links\\test\\Prueba\\Prueba_1\\archivo.txt';
      expect(isDirectory(filePath)).toBe(false);
    })
  });

  describe('isMarkdownFile', () => {
    it('debe retornar true para una ruta con extensión .md', () => {
      const archivoMarkdown = 'Prueba/Prueba_1/prueba.md';
      expect(isMarkdownFile(archivoMarkdown)).toBe(true);
    });

    it('debe retornar false para una ruta con extensión distinta a .md', () => {
      const archivoNoMarkdown = 'Prueba/Prueba_1/texto.txt';
      expect(isMarkdownFile(archivoNoMarkdown)).toBe(false);
    });
  });

  describe('extractLinksFromFileMD', () => {
    it('debe extraer los enlaces correctamente del contenido del archivo MD', () => {
      const fileContent = `
        Este es un [enlace 1](https://www.google.com) en el archivo MD.
        También hay otro [enlace 2](https://www.example.com) por aquí.
      `;
      const ruta = '/ruta/del/archivo.md';
  
      const expectedLinks = [
        {
          file: ruta,
          href: 'https://www.google.com',
          text: 'enlace 1',
        },
        {
          file: ruta,
          href: 'https://www.example.com',
          text: 'enlace 2',
        },
      ];
  
      const extractedLinks = extractLinksFromFileMD(fileContent, ruta);
      expect(extractedLinks).toEqual(expectedLinks);
    });
  
    it('debe acortar el texto del enlace si es demasiado largo', () => {
      const fileContent = `
        [enlace con un texto muy largo que supera los 50 caracteres](https://www.google.com).
      `;
      const ruta = '/ruta/del/archivo.md';
  
      const expectedLinks = [
        {
          file: ruta,
          href: 'https://www.google.com',
          text: 'enlace con un texto muy largo que supera los 50 ca',
        },
      ];
  
      const extractedLinks = extractLinksFromFileMD(fileContent, ruta);
      expect(extractedLinks).toEqual(expectedLinks);
    });
  });
  
  describe('exploreDirectory', () => {
    it('debe recorrer recursivamente los directorios para encontrar archivos con extensión .md', () => {
      const directoryPath = 'C:\\Users\\USER\\Desktop\\DEV007-md-links\\test\\Prueba';
      const expectedMdFiles = [
        'C:\\Users\\USER\\Desktop\\DEV007-md-links\\test\\Prueba\\Prueba_1\\prueba.md', 
        'C:\\Users\\USER\\Desktop\\DEV007-md-links\\test\\Prueba\\Prueba_2\\prueba_copy.md'];

      const mdFiles = exploreDirectory(directoryPath);
      expect(mdFiles).toEqual(expectedMdFiles);
    })
  });

  describe('validateLinks', () => {
    it('debe verificar la validez de los links encontrados en los MD', () => {
      const validLink = { href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions' };
      const invalidLink = { href: 'https://www.bbc.co.uk/academy/journalism/skills/writing' };
  
      return validateLinks(validLink)
        .then(validatedValidLink => {
          expect(validatedValidLink.ok).toBe('ok');
          return validateLinks(invalidLink);
        })
        .then(validatedInvalidLink => {
          expect(validatedInvalidLink.ok).toBe('fail');
        })
        .catch(error => {
          // error
        });
    });
  });

  describe('calculateStats', () => {
    it('debe calcular cuántos enlaces hay en total, unique y broken', () => {
      const links = [
        { href: 'https://curriculum.laboratoria.la/es/topics/javascript/02-flow-control/03-functions', ok: 'ok' },
        { href: 'https://developer.mozilla.org/es/docs/Learn/JavaScript/Building_blocks/Functions', ok: 'fail' },
        { href: 'https://www.bbc.co.uk/academy/journalism/skills/writing', ok: 'fail' },
      ];
  
      const stats = calculateStats(links);
  
      expect(stats.total).toBe(links.length);
      expect(stats.unique).toBe(1); 
      expect(stats.broken).toBe(2);
    });
  });
