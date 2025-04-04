const User = require('./user');

class UserService {
  constructor() {
    this.userList = [];

    for (let i = 1; i <= 3; i++) {
      const username = `user${Math.floor(Math.random() * 1000)}`;
      const password = `pass${Math.floor(Math.random() * 1000)}`;
      this.userList.push(new User(i, username, password));
    }
  }

  getUsers() {
    return this.userList;
  }

  addUser(user) {
    this.userList.push(user);
  }

  editUser(id, newUser) {
    const index = this.userList.findIndex(u => u.id === id);
    if (index !== -1) {
      this.userList[index] = newUser;
    }
  }

  deleteUser(id) {
    this.userList = this.userList.filter(u => u.id !== id);
  }
}

module.exports = UserService;
