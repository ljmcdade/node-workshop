/**
 * Returns the distance travelling from 'this' point to destination point along a rhumb line.
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance in km between this point and destination point (same units as radius).
 *
 * @example
 *     var p1 = new LatLon(51.127, 1.338), p2 = new LatLon(50.964, 1.853);
 *     var d = p1.distanceTo(p2); // Number(d.toPrecision(4)): 40310
 */
LatLon.prototype.rhumbDistanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    // see http://williams.best.vwh.net/avform.htm#Rhumb

    var R = radius;
    var φ1 = this.lat.toRadians(), φ2 = point.lat.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = Math.abs(point.lon-this.lon).toRadians();
    // if dLon over 180° take shorter rhumb line across the anti-meridian:
    if (Math.abs(Δλ) > Math.PI) Δλ = Δλ>0 ? -(2*Math.PI-Δλ) : (2*Math.PI+Δλ);

    // on Mercator projection, longitude distances shrink by latitude; q is the 'stretch factor'
    // q becomes ill-conditioned along E-W line (0/0); use empirical tolerance to avoid it
    var Δψ = Math.log(Math.tan(φ2/2+Math.PI/4)/Math.tan(φ1/2+Math.PI/4));
    var q = Math.abs(Δψ) > 10e-12 ? Δφ/Δψ : Math.cos(φ1);

    // distance is pythagoras on 'stretched' Mercator projection
    var δ = Math.sqrt(Δφ*Δφ + q*q*Δλ*Δλ); // angular distance in radians
    var dist = δ * R;

    return dist;
};






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
}

prompt.start();
prompt.get(["location"], function (err, result){
    request("https://maps.googleapis.com/maps/api/geocode/json?address=" + result.location, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var theResult = JSON.parse(body);
            console.log(theResult.results[0].geometry.location);
            //collect variables
        }
    });
    
});



        

            
