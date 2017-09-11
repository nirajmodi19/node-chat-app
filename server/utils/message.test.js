const expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		var from = 'niraj';
		var text = 'Some text here';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});
	});
});

describe('generateLocationMessage', () => {
	it('should generate correct location object', () => {
		var from = 'niraj';
		var lat = 1;
		var lng =  1;
		var location = generateLocationMessage(from, lat, lng);

		expect(location.createdAt).toBeA('number');
		expect(location.url).toBe('https://www.google.com/maps?q=1,1');
	});
});