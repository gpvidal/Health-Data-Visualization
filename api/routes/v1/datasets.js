var express = require('express');
var router = express.Router();
var models = require('../../models');

/*
 *	GET /counties/:countyId/indicators/summary/lasts
 *	Return the last year datasets associated to county
 */

 router.get('/counties/:countyId/indicators/summary/lasts', function(req, res) {
 	models.dataset.findAll({ 	
 		include: [models.indicator],	
 		where: {
 			county_id: req.params['countyId'] 			
 		},
 		order: 'year DESC, indicator_id ASC',
 		group: 'indicator_id'
 	}).then(function(datasets) {
		res.type('json');
		res.send(JSON.stringify(datasets));
	});
 	
 });


/*
 *	GET /counties/:countyId/indicators/progression
 *	Return the progression for each indicator associated to county
 */

 router.get('/counties/:countyId/indicators/progression', function(req, res) {

 	var summary = [];
 	models.indicator.findAll().then(function(indicators) {

 		indicators.forEach(function(indicator){

 			promises = []

 			promises.push(

				models.dataset.findAll({ 	
	 				where: {
	 					county_id: req.params['countyId'],
						indicator_id: indicator.id
		 			}, 		
					order: 'year ASC, indicator_id ASC'
	 		
				}).then(function(datasets) {
					
					var summary_per_indicator = {};
					summary_per_indicator.indicator = indicator;
					summary_per_indicator.data = datasets;
					summary.push(summary_per_indicator);

				})

			);

 		});


		return Promise.all(promises); 		
		
	}).then(function(){
		res.type('json');
		res.send(JSON.stringify(summary));
	});
 	
 });



 module.exports = router;