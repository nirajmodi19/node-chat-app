const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () =>{

	it('should reject non-string values', () => {
		var str = 123;
		var checkedValue = isRealString(str);
		expect(checkedValue).toBe(false);
	});

	it('should reject string with only spaces', () => {
		var str = '     ';
		var checkedValue = isRealString(str);
		expect(checkedValue).toBe(false);
	});

	it('should allow string with non-space character', () => {
		var str = '   test  ';
		var checkedValue = isRealString(str);
		expect(checkedValue).toBe(true);
	});
});