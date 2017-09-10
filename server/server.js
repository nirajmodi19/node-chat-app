const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000; 
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
io.on('connection', (socket) => {
	console.log('New User Connected');

	/*socket.emit('newEmail', {
		from: 'niraj@example.com',
		text: 'hello world',
		createdAt: 111
	});*/

	socket.emit('newMessage', {
		from: 'abc@mail.com',
		text: "Hi",
		createdAt: 123
	});

	socket.on('createMessage', (message) => {
		console.log('createMessage: ',message);
	});

	/*socket.on('createEmail', (newEmail) => {
		console.log('createEmail:', newEmail);
	});*/

	socket.on('disconnect', () => {
	console.log('User was disconnected');
	});
});

server.listen(port, () => {
	console.log(`Started at port ${port} `);
});