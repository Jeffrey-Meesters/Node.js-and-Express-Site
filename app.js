const express = require('express');
const { projects } = require("./data.json");

const app = express();
const host = 'localhost';
const port = 3000;

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log(projects);
    res.send(projects);
});

app.get('/about', (req, res) => {});

app.get('/project/:id', (req, res) => {});

app.listen(port, () => {
    console.log(`http://${host}:${port}/`);
});
