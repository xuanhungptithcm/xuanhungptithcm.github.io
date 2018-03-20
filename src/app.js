const Peer = require('peerjs');
const $ = require('jquery');
const uid = require('uid');
const openStream = require('./getStream');
const playVideo = require('./playVideo');
const config = { host: 'chat2003.herokuapp.com', port: 443, secure: true, key: 'peerjs' }

function getPeer() {
    const peerid = uid(10);
    $('#peer-id').append(peerid);
    return peerid;
}


const peer = Peer(getPeer(), config);
console.log(peer);
$('#btnCall').click(() => {
    const friendId = $('#txtFriendId').val();
    openStream(stream => {
        playVideo(stream, 'localStream');
        const call = peer.call(friendId, stream);
        call.on('stream', remoteStream => {
            playVideo(remoteStream, 'friendStream');
        });
    });

});

peer.on('call', (call) => {
    openStream(stream => {
        playVideo(stream, 'localStream');
        call.answer(stream);
        call.on('stream', remoteStream => playVideo(remoteStream, 'friendStream'));
    });
});