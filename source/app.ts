/// <reference path="../typings/index.d.ts" />
import express = require('express');
import bodyParser = require('body-parser');
import mongoose = require('mongoose');

var db = mongoose.connection;
db.on('error',  err =>{ console.error(err)});
db.on('open', () => {console.log("Connected!")});

var dbUri = "mongodb://eqreportuser:eqreportuser@ds036709.mlab.com:36709/eqreporttest";
mongoose.connect(dbUri);


var app = express();
app.use(bodyParser.json());

app.get('/', (req, res) =>{
    res.send('API says time is ' + new Date());
});

// Routes
import fib = require('./routes/report.route');

app.use('/report', fib);

var server = app.listen(3000, () =>{
    var add = server.address().address;
    
    console.log(`Listening to http://${server.address().address}:${server.address().port}`);    
})
