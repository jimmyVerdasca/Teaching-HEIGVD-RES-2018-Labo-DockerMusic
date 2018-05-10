var dgram = require('dgram');
var net = require('net');
var moment = require('moment');

var maMap = new Map();

// TCP
var PORT_TCP = 2205;
var PORT_UDP = 8888;
var HOST = '127.0.0.1';

var serverTCP = net.createServer(function(socket) {
    listCurrentInstrument = []
    for (let [ key, val ] of maMap.entries()) {
        listCurrentInstrument.push(val[0])
        console.log(val[0])
    }
	socket.write(listCurrentInstrument.toString());
	socket.pipe(socket);
});

serverTCP.listen(PORT_TCP, '127.0.0.1');

//UDP
var serverUDP = dgram.createSocket('udp4');
serverUDP.bind(PORT_UDP, HOST);

serverUDP.on('listening', function () {
    var address = serverUDP.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

serverUDP.on('message', function (message, remote) {
    //console.log(remote.address + ':' + remote.port +' - ' + message);
    json = JSON.parse(message)
    maMap.set(json['uuid'], [json['name'],json['activeSince']])
    console.log(json['uuid'])
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
}, 5000);

