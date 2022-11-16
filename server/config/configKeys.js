// Importamos la dependencia dotEnv
import dotEnv from 'dotenv';

// Cargar las variables de entorno
dotEnv.config();

// Creando objeto de configuracion

// Creando configuracion por defecto
const defatultConfig = {
  port: process.env.PORT || '3000',
  appVersion: process.env.APP_VERSION,
};

// Configuracion para desarollo
const devConfig = {
  env: 'development',
  mongoUrl: process.env.DEV_DATABASE_URL,
  debug: process.env.DEBUG,
};

// Configuracion para produccion
const prodConfig = {
  env: 'production',
  mongoUrl: 'cloud url',
};

// Funcion que dado el entorno de ejecucion
// nos retorne el objeto de configuracion adecuado
function envCofig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'production':
      return prodConfig;
    default:
      return prodConfig;
  }
}

// Exportar la configuracion
export default {
  ...defatultConfig,
  ...envCofig(process.env.NODE_ENV),
};
