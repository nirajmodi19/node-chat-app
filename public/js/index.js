var socket = io();

//".on" is used for event listening & ".emit" is used to emit event

socket.on('connect', function () {		
	console.log('Connected to server');	
});

socket.on('newMessage', function (message) {
	console.log('New message recieved: ', message);
});

socket.on('disconnect', function() {
	console.log('Disconnected from server');
});
