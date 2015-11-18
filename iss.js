// /**
//  * Returns the distance travelling from 'this' point to destination point along a rhumb line.
//  *
//  * @param   {LatLon} point - Latitude/longitude of destination point.
//  * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
//  * @returns {number} Distance in km between this point and destination point (same units as radius).
//  *
//  * @example
//  *     var p1 = new LatLon(51.127, 1.338), p2 = new LatLon(50.964, 1.853);
//  *     var d = p1.distanceTo(p2); // Number(d.toPrecision(4)): 40310
//  */
// LatLon.prototype.rhumbDistanceTo = function(point, radius) {
//     if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
//     radius = (radius === undefined) ? 6371e3 : Number(radius);

//     // see http://williams.best.vwh.net/avform.htm#Rhumb

//     var R = radius;
//     var φ1 = this.lat.toRadians(), φ2 = point.lat.toRadians();
//     var Δφ = φ2 - φ1;
//     var Δλ = Math.abs(point.lon-this.lon).toRadians();
//     // if dLon over 180° take shorter rhumb line across the anti-meridian:
//     if (Math.abs(Δλ) > Math.PI) Δλ = Δλ>0 ? -(2*Math.PI-Δλ) : (2*Math.PI+Δλ);

//     // on Mercator projection, longitude distances shrink by latitude; q is the 'stretch factor'
//     // q becomes ill-conditioned along E-W line (0/0); use empirical tolerance to avoid it
//     var Δψ = Math.log(Math.tan(φ2/2+Math.PI/4)/Math.tan(φ1/2+Math.PI/4));
//     var q = Math.abs(Δψ) > 10e-12 ? Δφ/Δψ : Math.cos(φ1);

//     // distance is pythagoras on 'stretched' Mercator projection
//     var δ = Math.sqrt(Δφ*Δφ + q*q*Δλ*Δλ); // angular distance in radians
//     var dist = δ * R;

//     return dist;
// };






// var request = require('request');

// request("http://api.open-notify.org/iss-now.json", function (error, response, body) {

//     if (!error && response.statusCode === 200) {
//         var theResult = JSON.parse(body);

//         console.log(theResult.iss_position);
//     }
// });

//where to put iss lat and lng in callback request       asynch call within asynch call within asynch call


//----------------
var prompt = require("prompt");
var request = require('request');

Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};

prompt.start();

prompt.get(["What's your current location?"], function(err, result) {
    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var theResult = JSON.parse(body);

            //var userLocation = theResult.results[0].geometry.location;

            var userLat = theResult.results[0].geometry.location.latitude;
            var userLon = theResult.results[0].geometry.location.longitude;
            //collect variables

            request("http://api.open-notify.org/iss-now.json", function(error, response, body) {

                if (!error && response.statusCode === 200) {
                    var theResult = JSON.parse(body);

                    //var issLocation = theResult.iss_position;

                    var issLat = theResult.iss_position.latitude;
                    var issLon = theResult.iss_position.longitude;
                }


                function distanceFromUserToISS(issLat, issLon, userLat, userLon) {
                    var R = 6371000; // metres
                    var φ1 = userLat.toRadians();
                    var φ2 = issLat.toRadians();
                    var Δφ = (issLat - userLat).toRadians();
                    var Δλ = (issLon - userLon).toRadians();

                    var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                        Math.cos(φ1) * Math.cos(φ2) *
                        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
                    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

                    return R * c;
                }

                distanceFromUserToISS(userLat, userLon, issLat, issLon);

            });
            
            
        }
    });

});
