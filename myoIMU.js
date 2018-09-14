// Simple HTTP calls to Node-Red from Myo events
// define all callbacks, then connect to Myo connect

var myMyo = require('myo');
var https = require('https');

var tracking;
var xRot;
var xStep;
var httpHost='gamma-rover.mybluemix.net';
var DEBUG=0;


myMyo.onError = function () {
        console.log("Whoops, couldn't connect to Myo Connect");
}

myMyo.on('fist', function(data,timestamp){
//    if(!edge) return;
// set up options for HTTP call
    var optionsgetmsg = {
       host : httpHost,
       port : 443,
       path : '/myo?gesture=fist',
       method : 'GET',
       headers : { "X-Auth-Token" : "MyT0pS8cret" }
    };

    // send the event by http
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment this for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
          if (DEBUG) {
             console.info('GET result after POST:\n');
             process.stdout.write(d);
             console.info('\n\nCall completed');
          };
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

// set up options for HTTP call
    var optionsgetmsg = {
       host : httpHost,
       port : 443,
       path : '/myo?gesture=wave_in',
       method : 'GET',
       headers : { "X-Auth-Token" : "MyT0pS8cret" }
    };

    // send the event by http
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
         if (DEBUG) {
            console.info('GET result after POST:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
         };
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

// set up options for HTTP call
    var optionsgetmsg = {
       host : httpHost,
       port : 443,
       path : '/myo?gesture=wave_out',
       method : 'GET',
       headers : { "X-Auth-Token" : "MyT0pS8cret" }
    };

    // send the event by http
    var reqGet = https.request(optionsgetmsg, function(res) {
    // console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
    //  console.log("headers: ", res.headers);
       res.on('data', function(d) {
         if (DEBUG) {
            console.info('GET result after POST:\n');
            process.stdout.write(d);
            console.info('\n\nCall completed');
         };
       });
    });

    reqGet.end();
    reqGet.on('error', function(e) {
       console.error(e);
    });

    this.vibrate();
});


myMyo.on('fingers_spread', function(data,timestamp){
      if(!tracking) {
        tracking = 1;
        this.zeroOrientation();
        xStep = this.lastIMU.orientation.x;
      }
      else {
        tracking = 0;
      }
    this.vibrate();
});

myMyo.on('imu', function(data) {
    if (tracking) {
        // console.log('Previous x', this.lastIMU.orientation.x, 'Current x ', data.orientation.x );
        if (Math.abs(this.lastIMU.orientation.x - data.orientation.x) > 0.001) {
           xRot = data.orientation.x;
           if (Math.abs(xStep - xRot) > 0.03) {
             xStep = xRot;
             console.log('changing xStep to ', xStep);
             // set up options for HTTP call
                 var optionsgetmsg = {
                    host : httpHost,
                    port : 443,
                    path : '/myo?xRot=' + xStep,
                    method : 'GET',
                    headers : { "X-Auth-Token" : "MyT0pS8cret" }
                 };

              // send the event by http
             var reqGet = https.request(optionsgetmsg, function(res) {
             // console.log("statusCode: ", res.statusCode);
             // uncomment it for header details
             //  console.log("headers: ", res.headers);
                res.on('data', function(d) {
                  if (DEBUG) {
                     console.info('GET result after POST:\n');
                     process.stdout.write(d);
                     console.info('\n\nCall completed');
                  };
                });
             });

             reqGet.end();
             reqGet.on('error', function(e) {
                console.error(e);
             });

           }
        }
    };
});


// all callbacks registered, attach to Myo Connect
myMyo.connect();
