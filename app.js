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
    // render the index page and give it all project data
    res.render('index', projects);
});

// The about route of our app
app.get('/about', (req, res) => {
    // render the about page
    res.render('about');
});

app.get('/project/', (req, res) => {
    res.redirect('/project/0');
});

//The project route + an id to get the correct project
app.get('/project/:id', (req, res) => {
    //The id can be found in the requests params
    const proId = req.params.id;
    let currProject;

    // loop over all projects
    for (let i = 0; i < projects.projects.length; i ++ ) {
        // if the project id matched the id from the params:
        if (projects.projects[i].id === Number(proId)) {
            // set current project to the project with the matching id's
            currProject = projects.projects[i];
        }
    }

    // if currProject is not falsy:
    if (currProject) {
        // render project with all current project data
        res.render('project', currProject);
    } else {
        // else render the error page and give it an message
        console.log(`this project id does not exist: ${proId}`);
        const message = `Project with id ${proId} does not exist. Please use the back button.`;
        res.render('error', { message });
    }
});

// This middleware should always be as last
// It will be triggered when no route was matched
app.use((req, res, next) => {
   // Create a new error
   const error = new Error("page not found");
   // give the error the 404 status
   error.status = 404;
   // call next with the error so the error handler will be triggered
   // middleware will stop when calling next or sending a response
   next(error);
});
// End routes

// Error handler middleware
// whenever next is called with a parameter
// it will assume it is an error
// this middleware will be triggered
// error middleware is middleware with the 4 parameters shown here:
app.use((error, req, res, next) => {
    // create a local called message and give it the error
    res.locals.message = error;
    // create an error status
    res.status(error.status);
    // render the error page
    console.log(`There was an error > status: ${error.status} > ${error} > ${error.stack}`);
    res.render('error');
});

// let the app listen on port 3000 and serve on localhost
// I wanted to open the browser on 'npm start' so I installed
// the 'open' node module as well
app.listen(port, () => {
    console.log(`app is running on: http://${host}:${port}/`);
    console.log(`press (mac) cmd + click on the url to open the browser...`);
    console.log("... ow wait!! I'm opening!!!");
    open(`http://${host}:${port}/`);
    console.log(' ');
    console.log('ps. you might be sorry if you use nodemon now! Every change will open a new window :)')
});
