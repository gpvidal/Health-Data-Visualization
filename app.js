var express = require('express');
var app = express();
const path = require('path');


/***************************************
 * STATIC CONTENT
****************************************/

app.use(express.static('./www/public'));

/***************************************
 * API
****************************************/

//Loading API Models
var apiModels = require('./api/models');

// Loading all API routes
var apiRoutes = require('./api/routes/routes');
app.use('/api', apiRoutes);


/***************************************
 * INDEX
****************************************/

app.get('/', function (req, res) {
  res.sendFile(path.resolve('www', 'index.html'));
})


/***************************************
 * SERVER
****************************************/

// Load models and start server
apiModels.sequelize.sync().then(function() {

	app.listen(3000, function () {
	  console.log('App listening on port 3000!');
	});

});
