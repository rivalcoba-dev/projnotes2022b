/*
Winston ofrece 3 tipos de transportes:
1. Console
2. File
3. Http
*/
// Importar Winston
import Winston, { format } from 'winston';

// Se obtiene la ruta a la raiz del proyecto
import appRoot from 'app-root-path';

// Desestructurando modulos utiles de format
const { combine, timestamp, label, printf, colorize } = format;

// Definiendo colores para cada tipo de error
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};

// Agregando el esquema de colores a Winston
Winston.addColors(colors);

// Creando los formatos para la consola
const myConsoleFormat = combine(
  // Colores
  colorize({ all: true }),
  // Agregar una etiqueta
  label({ label: '✒️' }),
  // Agregando Fecha
  timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
  // Funcion de impresion
  printf(
    (info) =>
      `${info.label}: ${info.level}: ${info.timestamp}: ${info.message} `
  )
);

// Creando el formato para archivo
const myFileFormat = combine(
  // Quitando el color de texto de salida
  format.uncolorize(),
  // Agregamos fecha
  timestamp({ format: 'DD-MM-YY HH-mm-ss' }),
  // Formato de archivo de salida
  format.json()
);

// Creando el objeto de opciones de Winston
const options = {
  infoFile: {
    level: 'info',
    filename: `${appRoot}/server/logs/info.log`,
    handleExceptions: false,
    maxSize: 1048576, // 1MB
    maxFiles: 5,
    format: myFileFormat,
  },
  warnFile: {
    level: 'warn',
    filename: `${appRoot}/server/logs/warn.log`,
    handleExceptions: false,
    maxSize: 1048576, // 1MB
    maxFiles: 5,
    format: myFileFormat,
  },
  errorFile: {
    level: 'error',
    filename: `${appRoot}/server/logs/error.log`,
    handleExceptions: false,
    maxSize: 1048576, // 1MB
    maxFiles: 5,
    format: myFileFormat,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat,
  },
};

// Creamos una instancia del Logger
const logger = Winston.createLogger({
  transports: [
    new Winston.transports.File(options.infoFile),
    new Winston.transports.File(options.warnFile),
    new Winston.transports.File(options.errorFile),
    new Winston.transports.Console(options.console),
  ],
  exitOnError: false, // No finaliza en excepciones no manejadas
});

// Esto sirve para acomplar morgan a winston
/*
morgan --> Winston --> [transport info]
*/
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

// Exportando el Logger
export default logger;
