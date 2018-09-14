// Simple HTTP calls to Node-Red from Myo events
// define all callbacks, then connect to Myo connect

var myMyo = require('myo');
var https = require('https');


Myo.onError = function () {  
        console.log("Whoops, couldn't connect to Myo Connect");
}

myMyo.on('fist', function(data,timestamp){
//    if(!edge) return;

    var optionsgetmsg = {
       host : 'gamma-rover.mybluemix.net', // here only the domain name
       // (no http/https !)
       port : 443,
       path : '/myo?gesture=fist', // the rest of the url with parameters if needed
       method : 'GET' // do GET
    };

    // do the GET request
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
          console.info('GET result after POST:\n');
          process.stdout.write(d);
          console.info('\n\nCall completed');
       });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
       console.error(e);
    });

    this.vibrate();
});

myMyo.on('wave_in', function(data, timestamp){
//    if(!edge) return;

    var optionsgetmsg = {
       host : 'gamma-rover.mybluemix.net', // here only the domain name
       // (no http/https !)
       port : 443,
       path : '/myo?gesture=wave_in', // the rest of the url with parameters if needed
       method : 'GET' // do GET
    };

    // do the GET request
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
          console.info('GET result after POST:\n');
          process.stdout.write(d);
          console.info('\n\nCall completed');
       });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
       console.error(e);
    });

    this.vibrate();
});

myMyo.on('wave_out', function(data,timestamp){
//    if(!edge) return;

    var optionsgetmsg = {
       host : 'gamma-rover.mybluemix.net', // here only the domain name
       // (no http/https !)
       port : 443,
       path : '/myo?gesture=wave_out', // the rest of the url with parameters if needed
       method : 'GET' // do GET
    };

    // do the GET request
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
          console.info('GET result after POST:\n');
          process.stdout.write(d);
          console.info('\n\nCall completed');
       });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
       console.error(e);
    });

    this.vibrate();
});


// all callbacks registered, attach to Myo Connect
myMyo.connect();
