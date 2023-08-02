
const path = require('path');
const { routeExists, isAbsolute, convertToAbsolute, isDirectory, isFile, isMarkdownFile} = require('../function.js');

// TEST PARA RUTA EXISTE
describe('función routeExists', () => {
  it('debe devolver true para un directorio existente', () => {   
    const result = routeExists('C:\\Users\\SUSAN\\Desktop\\LABORATORIA\\DEV007-md-links\\Directorio_Mock\\prueba_1');
    expect(result).toBe(true);
  });

  it('debe devolver false para un directorio no existente', () => {
    const result = routeExists('ruta-no-existente');
    expect(result).toBe(false);
  });
});

// TEST PARA VER SI LA RUTA ES ABSOLUTA O RELATIVA
describe('función isAbsolute', () => {
  it('debe devolver true para una ruta absoluta', () => {
    const rutaAbsoluta = 'C:\\Users\\SUSAN\\Desktop\\file.txt'; 
    expect(isAbsolute(rutaAbsoluta)).toBe(true);
  });

  it('debe devolver false para una ruta relativa', () => {
    const rutaRelativa = './file.txt'; // Ruta relativa
    expect(isAbsolute(rutaRelativa)).toBe(false);
  });
});
// TEST DE CONVERTIR RUTA A ABSOLUTA
describe('función convertToAbsolute', () => {
  it('debe convertir una ruta relativa a una ruta absoluta', () => {
    const rutaRelativa = './archivo.txt'; 
    const rutaAbsoluta = convertToAbsolute(rutaRelativa);

    // Verificamos que la ruta convertida sea absoluta 
    expect(path.isAbsolute(rutaAbsoluta)).toBe(true);
  });
});

// TEST PARA DIRECTORIO
describe('isDirectory', () => {
  it('debe retornar true si es un directorio', () => {
    const validDir = 'C:\\Users\\SUSAN\\Desktop\\LABORATORIA\\DEV007-md-links\\Directorio_Mock'; 
    expect(isDirectory(validDir)).toBe(true);
  });

  it('debe retornar falso si no es un directorio ', () => {
    const validFile = 'C:\\Users\\SUSAN\\Desktop\\LABORATORIA\\DEV007-md-links\\Directorio_Mock\\prueba_2\\readme 4.md'; 
    expect(isDirectory(validFile)).toBe(false);
  });
});

// TEST PARA ARCHIVO
describe('isFile', () => {
  it('debe retornar true para una ruta válida que corresponde a un archivo', () => {
    const archivoValido = 'C:\\Users\\SUSAN\\Desktop\\LABORATORIA\\DEV007-md-links\\Directorio_Mock\\prueba_2\\readme 4.md'; 
    expect(isFile(archivoValido)).toBe(true);
  });

  it('debe retornar false si no es arhivo', () => {
    const directoryValid = 'C:\\Users\\SUSAN\\Desktop\\LABORATORIA\\DEV007-md-links\\Directorio_Mock\\prueba_1\\Prueba_recursividad\\Pruebavacía';
    expect(isFile(directoryValid)).toBe(false);
  });
});

// TEST PARA ARCHIVO MD
describe('isMarkdownFile', () => {
  it('debe retornar true para una ruta con extensión .md', () => {
    const archivoMarkdown = 'ruta/del/archivo.md'; 
    expect(isMarkdownFile(archivoMarkdown)).toBe(true);
  });

  it('debe retornar false para una ruta con extensión distinta a .md', () => {
    const archivoNoMarkdown = 'ruta/del/archivo.txt'; 
    expect(isMarkdownFile(archivoNoMarkdown)).toBe(false);
  });
});