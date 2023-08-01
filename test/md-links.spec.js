
const { routeExists, isAbsolute, convertToAbsolute, isDirectory, } = require('../function.js');

// TEST PARA RUTA EXISTE
describe('función routeExists', () => {
  it('debe devolver true para un directorio existente', () => {
    // Escapar las barras invertidas en la ruta
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
    const rutaAbsoluta = 'C:\\Users\\SUSAN\\Desktop\\file.txt'; // Ruta absoluta válida para tu sistema
    expect(isAbsolute(rutaAbsoluta)).toBe(true);
  });

  it('debe devolver false para una ruta relativa', () => {
    const rutaRelativa = './file.txt'; // Ruta relativa
    expect(isAbsolute(rutaRelativa)).toBe(false);
  });
});
// TEST PARA CONVERTIR RUTA A ABSOLUTA
describe('función convertToAbsolute', () => {
  it('debe convertir una ruta relativa a una ruta absoluta', () => {
    const rutaRelativa = './archivo.txt'; 
    const rutaAbsoluta = convertToAbsolute(rutaRelativa);

    // Verificamos que la ruta convertida sea absoluta 
    expect(path.isAbsolute(rutaAbsoluta)).toBe(true);
  });

});
