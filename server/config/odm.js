import mongoose from 'mongoose';
import logger from './winston';

class MongooseOdm {
  // Constructor de la clase
  constructor(url) {
    this.url = url;
  }

  // Metodo para conectar a la BD
  async connect() {
    try {
      // Configuraciones que requiere mongoose
      mongoose.Promise = global.Promise;
      logger.info(`🚠 Conectado a la DB en: ${this.url}`);
    } catch (error) {
      logger.error(
        `🥀 No se pudo realizar la conexion debido a: ${error.message}`
      );
    }
  }
}

export default MongooseOdm;
