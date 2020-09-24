const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const inventory = require('./inventory');
const path = require('path');

const app = express();

// Use morgan for logging
app.use(morgan('dev'));

// Make sure we can parse JSON request bodies
app.use(bodyParser.json());

/* Mount the workout and exercise routes. For instance, when a request begins with
   /workouts, we'll hand it off to the router defined in ./routes/workouts.js
  */
app.use('/inventory', inventory);

// Serve the index.html file in ./public as a homepage
app.use(express.static(path.join(__dirname, './')));

// If the environment has a PORT defined, use that (otherwise, default to 3030)
const PORT = process.env.PORT || 3030;

// Remember that we aren't able to use await outside of an async function.
function startServer() {
	try {
		app.listen(PORT, () => {
			console.log(`Getting swole on port ${PORT}`);
		});
	} catch (err) {
		console.error(err);
	}
}
startServer();
