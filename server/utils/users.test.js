const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: '100',
			name: 'Niraj',
			room: 'R1'
		}, {
			id: '101',
			name: 'Dhiraj',
			room: 'R2'
		}, {
			id: '102',
			name: 'Rishab',
			room: 'R1'
		}];
	});

	it('should add a user', () => {
		var users = new Users();
		var user = {
			id: '123',
			name: 'Niraj',
			room: 'R1'};
		var reqUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should remove a user', () => {
		var user = users.removeUser('102');

		expect(user.id).toBe('102');
		expect(users.users.length).toBe(2);
	});

	it('should not remove a user', () => {
		var user = users.removeUser('105');

		expect(user).toNotExist;
		expect(users.users.length).toBe(3);
	});

	it('should get a user', () => {
		var reqUser = users.getUser('102');

		expect(reqUser.id).toBe('102');
	});

	it('should not get a user', () => {
		var reqUser = users.getUser('104');

		expect(reqUser).toNotExist();
	});

	it('should return a user list', () => {
		var reqUser = users.getUserList('R1');

		expect(reqUser).toEqual(['Niraj', 'Rishab']);
	})
});


