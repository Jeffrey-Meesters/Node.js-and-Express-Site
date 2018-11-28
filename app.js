const express = require('express');
const { projects } = require("./data.json");

// initialize express and declare it on app
const app = express();
// set our host to be localhost
const host = 'localhost';
// set our port on port 3000
const port = 3000;

// set the static files to be on the uri "/static/"
app.use('/static', express.static('public'));
// set the view engine to use pug as templating language
app.set('view engine', 'pug');

// ROUTES
// GET
// the root/index route of our app
app.get('/', (req, res) => {
    console.log(projects);
    res.send(projects);
});

// The about route of our app
app.get('/about', (req, res) => {});

//The project route + an id to get the correct project
app.get('/project/:id', (req, res) => {});

// POST
// .. nothing here yet ..
// End routes

// let the app listen on port 3000 and serve on localhost
app.listen(port, () => {
    console.log(`http://${host}:${port}/`);
});
