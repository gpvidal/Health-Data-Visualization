var express = require('express');
var router = express.Router();
var models = require('../../models');

/*
 *	GET /list
 *	Return a list of counties
 */

router.get('/', function(req, res) {
 	
	models.county.findAll({
		include: [ models.state ]		
	}).then(function(counties) {
		res.type('json');
		res.send(JSON.stringify(counties));
	});

});




module.exports = router;
