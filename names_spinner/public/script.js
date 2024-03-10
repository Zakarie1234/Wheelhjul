const socket = io();

let username;
let adminName = "admin";
function joinLobby() {
    username = document.getElementById('nameInput').value;
    socket.emit('join', username);
    window.location.href = 'wheel.html';
}

socket.on('admin', () => {
    document.getElementById('spinButton').disabled = false;
});

function spinWheel() {
    socket.emit('spin');
}

socket.on('connect', () => {
    socket.emit('setAdmin', adminName);
});