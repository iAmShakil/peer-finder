const net = require('net');
const Buffer = require('buffer').Buffer;
const tracker = require('./tracker');
const geoIp = require('geoip-lite');

function downloadWrapper(torrent, filePath, callback){

    tracker(torrent, function(peers){
        let infoStore = [];
        peers.peers.map(
            function(peer){
                infoStore.push(geoIp.lookup(peer.ip));
            }
        );
        callback(infoStore, filePath);
    });
}

module.exports = downloadWrapper;