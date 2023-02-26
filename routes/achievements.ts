const achieveRouter = require('express').Router();
const achieveController = require('../controllers/achieveController.ts');

achieveRouter.get('/', achieveController.getAllAchievements);

achieveRouter.get('/:id', achieveController.getOneAchievement);

achieveRouter.post('/', achieveController.createAchievement);

achieveRouter.put('/:id', achieveController.updateAchievement);

achieveRouter.delete('/:id', achieveController.deleteAchievement);

module.exports = achieveRouter;
