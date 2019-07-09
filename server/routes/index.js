var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.use('/', require('./auth'));
router.use('/', require('./coins'));

module.exports = router;
