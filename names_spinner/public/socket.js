// socket.js

const socket = io();

// Handle events or functions related to Socket.IO connection
// For example, handling 'updateUsers' event, spin logic, etc.

// Update user list when it changes
socket.on('updateUsers', (users, randomNumber) => {
    console.log(users);
    updateUserList(users, randomNumber);
});


// Update user list when it changes
socket.on('startSpin', (wheelData) => {
    if(typeof(wheel) != undefined){
        wheel.spin(wheelData);
    }
});