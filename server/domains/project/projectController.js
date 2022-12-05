// Creando los Actions Methods
// del controlador Project

// Importando el modelo del proyecto
import ProjectModel from './projectModel';

// GET "/project"
// GET "/project/list"
const list = (req, res) => {
  // 1. Generando el view-model
  const viewModel = {};
  // 2. Madamos a generar la vista con el Template Engine
  res.render('project/list', viewModel);
};

// GET "/project/add"
// GET "/project/create"
const showAddProjectForm = (req, res) => {
  const viewModel = {};
  res.render('project/add', viewModel);
};

// POST "/project/add"
// POST "/project/create"
const addProject = async (req, res) => {
  // Rescatando la info del formulario
  const { validData, errorData: error } = req;
  let project = {};
  let errorModel = {};
  // Desesctructurando y renombrando error de datos
  // Verificando si hay error de validación
  if (error) {
    // Rescatar los datos del formlario
    project = error.value;
    // Quiero generar un objeto que contenga
    // los campos con error y sus errores
    errorModel = error.inner.reduce((prev, curr) => {
      // Creabdo una variable temporal donde
      // guardare el elemento anterior
      const newVal = prev;
      newVal[`${curr.path}Error`] = curr.message;
      return newVal;
    }, {});
  } else {
    // Creando un documento con los datos
    // Provistos por el formulario
    const projectInstance = new ProjectModel(validData);
    // Salvando el documento en la base de datos
    try {
      const projectDocument = await projectInstance.save();
      return res.json(projectDocument);
    } catch (error1) {
      return res.status(404).json({ error1 });
    }
  }
  // Contestando los datos del proyecti
  return res.status(200).render('project/add', { project, errorModel });
};

// Exportando el Controlador
export default { list, showAddProjectForm, addProject };
