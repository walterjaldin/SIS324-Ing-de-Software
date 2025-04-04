const express = require('express');
const UserService = require('./userService');
const User = require('./user');

const app = express();
const port = 3000;

const userService = new UserService();

app.use(express.json());

app.get('/users', (req, res) => {
  res.json(userService.getUsers());
});

app.post('/users', (req, res) => {
  const { id, username, password } = req.body;
  const newUser = new User(id, username, password);
  userService.addUser(newUser);
  res.status(201).json({ message: 'User added' });
});

app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password } = req.body;
  const updatedUser = new User(id, username, password);
  userService.editUser(id, updatedUser);
  res.json({ message: 'User updated' });
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  userService.deleteUser(id);
  res.json({ message: 'User deleted' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

