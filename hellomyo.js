var Myo = require('myo');

Myo.connect();

Myo.on('fist', function(){
    console.log('Hello Myo!');
    this.vibrate();
});
