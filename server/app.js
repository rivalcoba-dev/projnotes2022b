// Biblioteca de 3ros para manejar errores http
// ES5: var createError = require('http-errors');
// ES6 👇
import createError from 'http-errors';
// El framework express
import express from 'express';
// Biblioteca del nucleo de node que sirve para
// administrar rutas
import path from 'path';
// Biblioteca externa que sirve para administrar
// cookies
import cookieParser from 'cookie-parser';
// Registrador de eventos HTTP
import morgan from 'morgan';

// Importando Webbpack middleware
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';

// Importando el configurador de motor de plantillas
import configTemplateEngine from './config/templateEngine';

// Logger de la aplicación
import logger from './config/winston';
import debug from './services/debugLogger';

// Importando enrutador
import router from './routes/router';

// Importando los valores de entorno
import configKeys from './config/configKeys';
// Importando odm
import MongooseOdm from './config/odm';

// Recuperar el modo de ejecución de la app
const nodeEnv = configKeys.env;

// Creando una instancia de express
const app = express();

// Inclusion del webpack middleware
if (nodeEnv === 'development') {
  debug('✒ Ejecutando en modo de desarrollo 👨‍💻');
  // Configurando webpack en modo de desarrollo
  webpackConfig.mode = 'development';
  // Configurar la ruta del HMR (Hot Module Replacement)
  // 👉 "reload=true" -> Habilita la recarga automatica cuando un archivo
  // js cambia
  // 👉 "timeout=1000" -> Establece el timpo de refresco de la pagina
  webpackConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000',
    webpackConfig.entry,
  ];
  // Agregando el plugin a la configuracion
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // Crear el empaquetado con webpack
  const bundler = webpack(webpackConfig);
  // Registro el middleware en express
  app.use(
    webpackDevMiddleware(bundler, {
      publicPath: webpackConfig.output.publicPath,
    })
  );
  // Registrando el HMR Middleware
  app.use(WebpackHotMiddleware(bundler));
} else {
  debug('✒ Ejecutando en modo de producción 🏭');
}

// Realizando la conexión a la base de datos
// Creando una instancia a la conexion de la DB
const mongooseODM = new MongooseOdm(configKeys.mongoUrl);
// Ejecutar la conexion a la Bd
// Crear una IIFE para crear un ambito asincrono
// que me permita usar async await
(async () => {
  // Ejecutamos le metodo de conexion
  const connectionResult = await mongooseODM.connect();
  // Checamos si hay error
  if (connectionResult) {
    // Si conecto correctamente a la base de datos
    logger.info('✅ Conexion a la BD exitosa 🛢️');
  } else {
    logger.error('🥀 No se conecto a la base de datos');
  }
})();

// view engine setup
// Configura el motor de plantillas
configTemplateEngine(app);

// Establezco Middelware
app.use(morgan('dev', { stream: logger.stream }));
// Middleware para parsear a json la peticion
app.use(express.json());
// Decodificar la url
app.use(express.urlencoded({ extended: false }));
// Parsear cookies
app.use(cookieParser());
// Servidor de archivos estáticos
app.use(express.static(path.join(__dirname, '..', 'public')));

// Agregando rutas a la aplicacion
// con el enrutador
router.addRoutes(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  logger.error(
    `404 - Page Not Found - ${req.originalUrl} - Method: ${req.method}`
  );
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Registrando mensaje de error
  logger.error(`${err.status || 500} - ${err.message}`);

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Exportando la instancia del server "app"
// ES5 👇
// module.exports = app;
// ES6 👇
export default app;
