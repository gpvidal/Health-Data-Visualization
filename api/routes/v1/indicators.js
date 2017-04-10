var express = require('express');
var router = express.Router();
var models = require('../../models');

/*
 *	GET /list
 *	Return a list of indicators
 */

 router.get('/', function(req, res) {
 	models.indicator.findAll().then(function(indicators) {
		res.type('json');
		res.send(JSON.stringify(indicators));
	});
 });

 module.exports = router;