const user = require('express').Router();
const controller = require('../controllers/userController.ts');

user.get('/', controller.getAllUsers);

user.get('/:id', controller.getOneUser);

user.post('/', controller.createUser);

user.put('/:id', controller.updateUser);

user.delete('/:id', controller.deleteUser);

module.exports = user;
