var fs = require('fs');
var request = require('request');
const QuestionModel = require('./models/QuestionModel');

fs.open('data4', 'r', function (err, f) {
  fs.readFile(f, 'utf-8', function(err, data){
    var json = JSON.parse(data);
    var results = json["results"];
    var length = json["results"].length;

    for (let index = 0; index < length; index++) {
      request.post(
        'http://localhost:3000/questions',
        { json: { category: results[index]["category"], type : results[index]["type"], difficulty : results[index]["difficulty"], question : results[index]["question"], correct_answer : results[index]["correct_answer"], incorrect_answers : results[index]["incorrect_answers"] } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            }
        }
    );
    }
  });

});