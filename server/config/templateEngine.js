import exphbs from 'express-handlebars';
import path from 'path';

// app: Instancia de express
export default (app) => {
  // Configurar el motor de pantillas de express
  // usando express-handlebars
  // 1. Registar el motor de plantillas
  app.engine(
    'hbs',
    exphbs({
      extname: '.hbs',
      defaultLayout: 'main',
    })
  );

  // 2. Seleccionar el motor de plantillas
  app.set('view engine', 'hbs');

  // 3. Establecer la ruta de las vistas
  app.set('views', path.join(__dirname, '..', 'views'));

  // 4. Retornar la instancia de express
  return app;
};
