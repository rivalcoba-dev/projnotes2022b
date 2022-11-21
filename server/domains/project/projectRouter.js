// Importando el Router de Express
import { Router } from 'express';
// Importando el controlador
import projectController from './projectController';
// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET "/project"
// GET "/project/list"
router.get(['/', '/list'], projectController.list);

// Enrutamos
// GET "/project/add"
router.get(['/add', '/create'], projectController.add);

// Exporto este tramo de ruta
export default router;
