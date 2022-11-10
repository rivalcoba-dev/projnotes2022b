// Creando los Actions Methods
// GET "/"
// GET "/index"
const home = (req, res) => {
  // 1. Generando el view-model
  const viewModel = {
    title: 'Express',
    author: 'Ivan Rivalcoba',
  };

  // 2. Madamos a generar la vista con el Template Engine
  res.render('home/home', viewModel);
};

const about = (req, res) => {
  res.render('home/about', {});
};

// Exportando el Controlador
export default { home, about };
