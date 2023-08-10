const path = require('path');
const fs = require('fs');
const {
  routeExists,
  convertToAbsolute,
  isDirectory,
  isMarkdownFile,
  exploreDirectory
} = require('../function.js'); // Asegúrate de ajustar la ruta al archivo function.js

describe('funciones de manejo de rutas y archivos', () => {
  describe('routeExists', () => {
    it('debe devolver true para un directorio existente', () => {
      const result = routeExists('./Directorio_Mock/prueba_1');
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
      const validDir = './Directorio_Mock';
      expect(isDirectory(validDir)).toBe(true);
    });
  });

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

});