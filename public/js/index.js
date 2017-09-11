var socket = io();

//".on" is used for event listening & ".emit" is used to emit event

socket.on('connect', function () {		
	console.log('Connected to server');	
});

// NEW MESSAGE

socket.on('newMessage', function (message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery('#messages').append(html);
});

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


// NEW LOCATION MESSAGE

socket.on('newLocationMessage', function(message) {
	var formattedTime = moment(message.createdAt).format('h:mm a');
	var template = jQuery('#location-message-template').html();
	var html = Mustache.render(template, {
		url: message.url,
		createdAt: formattedTime,
		from: message.from
	});

	jQuery('#messages').append(html);
	// var li = jQuery('<li></li>');
	// var a =jQuery('<a target="_blank">My current location</a>');

	// li.text(`${message.from} ${formattedTime}: `);
	// a.attr('href', message.url);

	// li.append(a);
	// jQuery('#messages').append(li);
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

jQuery('#message-form').on('submit', function (e) {
	e.preventDefault();

	var messageTextBox = jQuery('[name=message]');
	socket.emit('createMessage', {
		from: 'User',
		text: messageTextBox.val()
	}, function () {
		messageTextBox.val('');
	});
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
	if(!navigator.geolocation) {
		return alert('Geolocation not supported for your browser');
	}
	locationButton.attr('disabled', 'disabled').text('Sending location ...');

	navigator.geolocation.getCurrentPosition(function (position) {
		locationButton.removeAttr('disabled').text('Send location');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send location');
		alert('Unable to fetch location.');
	});
});
socket.on('disconnect', function() {
	console.log('Disconnected from server');
});
