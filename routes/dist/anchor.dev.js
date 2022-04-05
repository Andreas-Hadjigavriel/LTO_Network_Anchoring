"use strict";

var anchoringContr = require('../controllers/anchorController');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('pages/index');
  });
  app.post('/', anchoringContr.fileAnchoring);
};