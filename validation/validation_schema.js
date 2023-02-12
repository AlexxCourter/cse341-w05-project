const Joi = require('@hapi/joi');

const postUserSchema = Joi.object({
    userName: Joi.string().min(3).max(18).required(),
    email: Joi.string().email().required(),
    pass: Joi.string().min(8).required(),
    bio: Joi.string().max(120).required(),
    achievements: Joi.array().required(),
    points: Joi.number().required(),
    createdDate: Joi.string().required()
});

const postAchieveSchema = Joi.object({
    taskName: Joi.string().required(),
    taskPoints: Joi.number().min(1).required()
});

module.exports = {
    postUserSchema,
    postAchieveSchema
}