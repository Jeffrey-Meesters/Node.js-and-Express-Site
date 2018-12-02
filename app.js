const express = require('express');
// https://www.npmjs.com/package/open
// https://www.npmjs.com/advisories/663
const open = require('open');
const projects  = require("./data.json");

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
    res.render('index', projects);
});

// The about route of our app
app.get('/about', (req, res) => {
    res.render('about');
});

//The project route + an id to get the correct project
app.get('/project/:id', (req, res) => {
    const proId = req.params.id;
    let currProject;

    for (let i = 0; i < projects.projects.length; i ++ ) {
        if (projects.projects[i].id === Number(proId)) {
            currProject = projects.projects[i];
        }
    }

    if (currProject) {
        res.render('project', currProject);
    } else {
        res.send('BUILD YOUR ERROR PAGE!!');
    }
});

// POST
// .. nothing here yet ..
// End routes

// let the app listen on port 3000 and serve on localhost
app.listen(port, () => {
    console.log(`app is running on: http://${host}:${port}/`);
    console.log(`press (mac) cmd + click on the url to open the browser...`);
    console.log("... ow wait!! I'm opening!!!");
    open(`http://${host}:${port}/`);
});
