var express = require('express');
var LintStream = require('jslint').LintStream;
var myParser = require("body-parser");
const path = require('path');

var options = {
    "edition": "latest",
    "length": 100
},
l = new LintStream(options);

var app = express();
app.use(express.static(__dirname + '/src'));
app.use(myParser.json());

app.post('/analyze', function (req, res) {
    var fileName = "linterchecker",
        fileContents = req.body.code;
    switch(req.body.language) {
        case "Javascript": 
            l.write({file: fileName, body: fileContents});
            l.on("data", function (chunk, encoding, callback) {
                res.json({
                    errors: chunk.linted.errors,
                    lines: chunk.linted.lines
                });
            });
            break;
    }
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/views/index.html'));
});

var server = app.listen(8085);