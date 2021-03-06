const uuidv1 = require('uuid/v1');
var dgram = require('dgram');

var PORT_UDP = 8888;
var MULTICAST_ADRESS = '239.255.36.36'

// get the argument instrument given
arg = process.argv[2]

//the existing instruments in the orchestra
var possiblesInstrument = {
    piano: 'ti-ta-ti',
    trumpet: 'pouet',
    flute: 'trulu',
    violin: 'gzi-gzi',
    drum: 'boum-boum'
};

//create the payload object
var instrument = {};
if (possiblesInstrument.hasOwnProperty(arg)) {
    instrument.uuid = uuidv1()
    instrument.name = arg
    instrument.sound = possiblesInstrument[arg]
    instrument.activeSince = new Date(Date.now()).toISOString()
} else {
    console.log('the given instrument doesn\'t exist')
}



//create the udp multicast connexion
setInterval(function () {

    instrument.activeSince = new Date(Date.now()).toISOString()
    //jsonify the object
    jsonifiedInstrument = new Buffer(JSON.stringify(instrument))

    console.log(jsonifiedInstrument)
    var client = dgram.createSocket('udp4');
    client.bind(PORT_UDP)
    client.send(jsonifiedInstrument, 0, jsonifiedInstrument.length, PORT_UDP, MULTICAST_ADRESS, function (err, bytes) {
        if (err) throw err;
        client.close();
    });
}, 1000);

