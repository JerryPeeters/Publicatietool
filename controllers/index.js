let express = require('express');
let router = express.Router();
let path = require('path');
let publicatie = require('../models/publicatie');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('publicatietool');
});

module.exports = router;
