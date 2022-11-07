// Notas importanes
// El archivo de configuración debe usar ES5

// Importar un administrador de rutas de archivos
const path = require('path');

// Importando el extractor de css
const MiniCssExtractPlugin =
  require('mini-css-extract-plugin');

// Importando Eslint para webpack
const ESlintPlugin = require('eslint-webpack-plugin')

// Exportamos un objeto de configuración
// que sera usado por webpack
module.exports = {
  // 1. El archivo de entrada o indexador
  entry: "./client/index.js",
  // 2. Especificar el archivo de salida
  output: {
    // 2.1 Ruta fuente de archivos publicos
    path: path.resolve(__dirname, "public"),
    // 2.2 Nombre del archivo de salida
    filename: "bundle.js",
    // 2.3 Agreando la ruta publica de servicio
    publicPath: '/'
  },
  // 3. Configurando el servidor de desarrollo
  devServer: {
    // 3.1 Folder de archivos estáticos
    static: path.join(__dirname, "public"),
    // 3.2 Puerto del servidor de desarrollo
    port: 3000,
    // 3.3 Definiendo el host
    host: "localhost"
  },
  // Agregando un modulo a webpack
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    'modules': false,
                    'useBuiltIns': 'usage',
                    'targets': {"chrome": 80},
                    'corejs': 3
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,'css-loader']
      }
    ]
  },
  // Seccion de plugins
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'stylesheets/app.css'
    }),
    new ESlintPlugin()
  ]
}
