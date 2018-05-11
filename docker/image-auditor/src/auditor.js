var dgram = require('dgram');
var net = require('net');
var moment = require('moment');

var maMap = new Map();

// TCP
var PORT_TCP = 2205;
var PORT_UDP = 8888;
var HOST = '0.0.0.0';
var MULTICAST_ADRESS = '239.255.36.36'

var serverTCP = net.createServer(function(socket) {
    listCurrentInstrument = []
    for (let [ key, val ] of maMap.entries()) {
        var instrument = {};
        instrument.uuid = key
        instrument.instrument = val[0]
        instrument.activeSince = val[1]
        listCurrentInstrument.push(instrument)
    }
    console.log(JSON.stringify(listCurrentInstrument))
	socket.write(JSON.stringify(listCurrentInstrument));
	socket.end()
});

serverTCP.listen(PORT_TCP, HOST);
console.log('UDP Server listening on ' + HOST + ":" + PORT_TCP);

//UDP
var serverUDP = dgram.createSocket('udp4');
serverUDP.bind(PORT_UDP, function() {
    console.log("An auditor has joined the concerto !");
    serverUDP.addMembership(MULTICAST_ADRESS);
});

serverUDP.on('listening', function () {
    var address = serverUDP.address();
});

serverUDP.on('message', function (message, remote) {
    //console.log(remote.address + ':' + remote.port +' - ' + message);
    json = JSON.parse(message)
    maMap.set(json['uuid'], [json['name'],json['activeSince']])
    console.log('datagram received from ' + json['name'] + json['uuid'])
});

//create the udp multicast connexion
setInterval(function () {
    for (let [ key, val ] of maMap.entries()) {
        now = moment(new Date())
        soundExpiration = moment(new Date(val[1])).add(5, 's')
        if (soundExpiration.isBefore(now)) {
            maMap.delete(key)
        }
    }
}, 1000);

