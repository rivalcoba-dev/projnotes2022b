// Importando el Router de Express
import { Router } from 'express';
// Importando el controlador
import projectController from './projectController';
// Importando factoria de validación
import ValidateFactory from '../../services/validateFactory';
// Importando objeto validador
import projectValidator from './projectValidator';
// Creando una isntancia del enrutador
const router = new Router();

// Enrutamos
// GET "/project"
// GET "/project/list"
router.get(['/', '/list'], projectController.list);

// Enrutamos
// GET "/project/add"
router.get(['/add', '/create'], projectController.showAddProjectForm);

// POST "/project/add"
router.post(
  ['/add', '/create'],
  ValidateFactory({
    schema: projectValidator.projectSchema,
    getObject: projectValidator.getProject,
  }),
  projectController.addProject
);

// Exporto este tramo de ruta
export default router;
