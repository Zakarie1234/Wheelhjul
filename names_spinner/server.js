// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path'); // Import the path module

// Store admin name
let adminName = 'admin2024';

// Store users in the lobby
let users = [];

const publicPath = path.join(__dirname, 'public'); // Set the path to your public directory
app.use(express.static(publicPath));


io.on('connection', (socket) => {
    console.log('a user connected');

    // Listen for new user joining
    socket.on('join', (data) => {
        // if (users.length === 0) {
        //     // First user is the admin
        //     adminName = username;
        //     socket.emit('admin');
        // }
        const r = Math.random();
        // Add user to the list
        users.push({ id: socket.id, name: data.username });
        console.log(users);
        console.log(' X updateUsers emit');
        io.emit('updateUsers', users, r);
    });

    // Listen for spin request
    socket.on('spin', (startAngle) => {
        const wheel = {
            spinStart : new Date().getTime(),
            maxSpeed : Math.PI / (5 + (Math.random() * 10)),
            currentAngle : startAngle
        }
        console.log("Spin Request From " + socket.id)
        console.log("========> Spin Request From " + getUsernameById(socket.id).username)
        if (adminName === getUsernameById(socket.id).username) {
            console.log("startSpin Emited by " + socket.id )
            // Emit spin event to all clients
            io.emit('startSpin', wheel);
        }
    });

    // Listen for disconnect
    socket.on('disconnect', () => {
        console.log('a user disconnected');
        users = users.filter(user => user.id !== socket.id);
        console.log(users);
        const r = Math.random();
        io.emit('updateUsers', users, r); // Emit updated user list when a user disconnects
        console.log(' Y updateUsers emit');

    });
});

function getUsernameById(id) {
    const user = users.find(user => user.id === id);
    return user ? user.name : null;
}

server.listen(3000, () => {
    console.log('listening on *:3000');
});
