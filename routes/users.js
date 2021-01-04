var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.send('Nothing\'s here');
});

module.exports = router;
