const knex = require('../database');
const Routes = require('../models/Routes');
const Delivery = require('../models/Delivery');

exports.createRoute = (req, res) => {
  const { route } = req.body;
  knex('routes')
    .insert({ route })
    .where({ route })
    .first()
    .then(route => res.status(200).json(route))
    .catch(err => res.status(500).json(err));
};

exports.getRoutes = (req, res) =>
  knex('routes')
    .select('*')
    .then(routes => res.status(200).json(routes))
    .catch(err => res.status(500).json(err));
// Routes.query()
//   .select(
//     'routes.id',
//     'routes.route',
//     'delivery.id',
//     'delivery.routeId',
//     'delivery.userId',
//   )
//   .leftJoin('delivery', 'routes.id', 'delivery.routeId')
//   .then(res => {
//     console.log(res);
//   });

exports.deleteRoute = (req, res) => {
  knex('routes')
    .where({ id: req.params.id })
    .first()
    .del()
    .then(() => res.status(200).json())
    .catch(err => res.status(500).json(err));
};
