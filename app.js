//Create server using express
const path = require('path');
const express = require('express');
const app = express();
const port = 4000;
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./apiDocs');

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT || port, function() {
    console.log(`My app is listening on port ${port}!`)
});

//Single route
app.get('/cyt', (req,res) => {
    res.end("Cytonn was here");
});

const drivers = [
    {name:"Tony",age:23},
    {name:"Lisa",age:41},
    {name:"Michael",age:91},
    {name:"Kim",age:65},
    {name:"Anto",age:34},
];
app.route('/drivers')
    .get(function (req, res) {
        res.json(drivers);
    })
    .post(function (req, res) {
        res.send('Add a driver')
    })
    .put(function (req, res) {
        res.send('Update driver details')
    })

//Express router
const cows = require('./cows');
const api = require('./api');

app.use('/cows', cows);
app.use('/api', api);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(apiDocs));