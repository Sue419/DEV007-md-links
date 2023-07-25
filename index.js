const fs = require('fs');
const path = require('path');

const routeExists = (path) => {
  return fs.existsSync(path);
};

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Verificar que la ruta existe
    const existRoute = routeExists(path);
    console.log('Ruta existe:', existRoute);
    //Si no existe se rechaza la promesa y finaliza el proceso
    if (!existRoute) {
      reject(new Error('La ruta no existe.'));
      return;
    }else {
      console.log('La ruta ingresada no existe')
    }
    
    // Si es que no se puede...se rechaza la operación
    // reject(new Error('Ocurrió un error'));
  })
}



module.exports = () => {
 mdLinks;
};
