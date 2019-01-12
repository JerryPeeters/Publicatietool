let express = require('express');
let router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'public', 'html', 'index.html'));
});

module.exports = router;
