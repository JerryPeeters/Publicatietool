let express = require('express');
let router = express.Router();
let path = require('path');
let publicatie = require('../models/publicatie');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('publicatietool');
  // res.sendFile(path.join(__dirname, '../', 'public', 'html', 'index.html'));
});

module.exports = router;
