const express = require('express');
const routesAPI = require('./routes/routesAPI');
const routesHTML = require('./routes/routesHTML');

// Initialize the app and create a port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', routesAPI);
app.use('/', routesHTML);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
