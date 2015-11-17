

var request = require('request');

request("http://api.open-notify.org/iss-now.json", function (error, response, body) {
    
    if (!error && response.statusCode === 200) {
        var theResult = JSON.parse(body);

        var documents = theResult.documents;

    //for (var i = 0; i < documents.length; i++) {
       // console.log(documents[i].title);

// or...
        var titles = documents.map(function(doc) {return doc.title;});
    }

/*function locationISS() {
    $ .getJSON("http://api.open-notify.org/iss-now.json?callback=?", function(data)) {
        var lat = data["iss_position"]["latitude"];
        var lng = data["iss_position"]["longitude"];
}}*/