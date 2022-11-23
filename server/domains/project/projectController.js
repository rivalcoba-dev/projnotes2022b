// Creando los Actions Methods
// del controlador Project

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
const addProject = (req, res) => {
  // Extrayendo la informacion
  // del formulario
  const { name, description } = req.body;
  res.status(200).json({
    name,
    description,
  });
};

// Exportando el Controlador
export default { list, showAddProjectForm, addProject };
