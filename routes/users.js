var express = require('express');
var router = express.Router();

router.get('/join', function(req, res, next) {
  res.render('join');
});

router.post('/join', function(req, res, next) {
  res.render('chat', {name: req.body.name});
});

module.exports = router;
