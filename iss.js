var request = require('request');

request("http://api.open-notify.org/iss-now.json", function (error, response, body) {
    
    if (!error && response.statusCode === 200) {
        var theResult = JSON.parse(body);
        
        console.log(theResult.iss_position);
        

            
