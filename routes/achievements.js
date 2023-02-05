const user = require('express').Router();
const controller = require('../controllers/achieveController');

user.get('/', controller.getAllAchievements);

user.get('/:id', controller.getOneAchievement);

user.post('/', controller.createAchievement);

user.put('/:id', controller.updateAchievement);

user.delete('/:id', controller.deleteAchievement);

module.exports = user;
