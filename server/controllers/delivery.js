const knex = require('../database');

exports.createRoute = (req, res) => {
  const { route } = req.body;
  knex('delivery')
    .insert({ route })
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};

exports.getRoutes = (req, res) =>
  knex('delivery')
    .select('*')
    .then(routes => res.status(200).json(routes))
    .catch(err => res.status(500).json(err));

exports.deleteRoute = (req, res) => {
  knex('delivery')
    .where({ id: req.params.id })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};
