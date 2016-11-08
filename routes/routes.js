'use strict';
const express = require('express');
const router = express.Router();
const tsv = require("node-tsv-json");
const fs = require('fs');


/**
 * Topic Intrusion Page
 */
router.get('/', function(req, res, next) {
    res.render('wordIntrusion', { title: 'Topic Model Evaluation Platform'});
});


/**
 * GET word intrusion service
 */
router.get('/dataWordIntrusion', function(req, res) {
    // READ FILE DATA
    tsv({
        input: "data/data.tsv", 
            output: null,
            parseRows: true
        }, function(err, result) {
            if(err) {
                console.error(err);
            }else {
                console.log(result.length);
                res.json(result);
            }
        });
});


/**
 * POST word intrusion service
 */
router.post('/dataWordIntrusion', function(req, res) {
    var line = req.body.currentLine;
    var selected = req.body.selected;
    
    // WRITE FILE DATA

        fs.exists('data/data_result.tsv', function (exists) {
            if(exists){
                fs.readFile('data/data_result.tsv', function(err, data) {
                    if(err) throw err;
                    var file = data.toString().split("\r\n");
                    file[line] = file[line] + "\t" + selected;
                    var resultString = "";
                    for(var i = 0; i < file.length; i++){
                        resultString += file[i] + "\r\n"
                    }
                    fs.writeFile('data/data_result.tsv', resultString, {encoding: 'utf8'}, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        res.json("Success");
                    });
                });
            }else{
                fs.readFile('data/data.tsv', function(err, data) {
                    if(err) throw err;
                    var file = data.toString().split("\r\n");
                    file[line] = file[line] + "\t" + selected;
                    var resultString = "";
                    for(var i = 0; i < file.length; i++){
                        resultString += file[i] + "\r\n"
                    }
                    fs.writeFile('data/data_result.tsv', resultString, {flag: 'wx', encoding: 'utf8'}, function(err) {
                        if(err) {
                            return console.log(err);
                        }
                        console.log("The file was saved!");
                        res.json("Success");
                    }); 
                });
            }
        });
});


module.exports = router;