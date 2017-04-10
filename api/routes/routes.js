/*************************************
 * API Routing
**************************************/

var express = require('express');
var router = express.Router();


// Loading API v1 routes

var v1Counties = require('./v1/counties');
var v1Indicators = require('./v1/indicators');
var v1Datasets = require('./v1/datasets');




// API V1 Routes

router.use('/v1/counties', v1Counties);
router.use('/v1/indicators', v1Indicators);
router.use('/v1/datasets', v1Datasets);
 


 module.exports = router;