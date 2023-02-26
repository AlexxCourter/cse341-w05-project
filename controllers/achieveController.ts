/**
 * @file Achievement controller handles callbacks for API calls requested by the client related to Achievements or goals in the database.
 * @author Alexander DK Courter
 * @version 1.0.2
 *
 * 1.0.2 - wrapped functions in try-catch blocks to handle errors. Separation of error handling managed by conditionals.
 * 1.0.1 - updated with basic error handling
 */

const MongoObjectId = require('mongodb').ObjectId;
const dbase = require('../db/connector.ts');
const Schema = require('../validation/validation_schema.ts').postAchieveSchema;
const databaseName = 'GoalAchievement'; //enter with exact capitalization
const collectName = 'achievements';

/**
 * Returns all objects registered to the Achievements collection.
 *
 * Node Express async function that connects to the database, finds a result (all achievements), then returns it via an HTTP response. The request is forwarded via Express Router from achievements.js
 * @version 1.0.2
 *
 * @param {*} req The request is forwarded through Express router. See achievements.js
 * @param {*} res The response is given for a GET request that gets all records
 */
const getAllAchievements = async (req, res) => {
  //#swagger.tags = ['Achievements']
  //#swagger.description = 'Returns all achievements (goals) currently registered in the database.'
  try {
    await dbase.connectDB();
    const result = await dbase.getDb().db(databaseName).collection(collectName).find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

/**
 * Returns one object registered to the Achievements collection using a specified object ID.
 *
 * Node Express async function that connects to the database, finds a result (one achievement), then returns it via an HTTP response. The request is forwarded via Express Router from achievements.js
 * @version 1.0.2
 *
 * @param {*} req The request is forwarded through Express router. See achievements.js
 * @param {*} res The response is given for a GET request that gets one record
 */
const getOneAchievement = async (req, res) => {
  //#swagger.tags = ['Achievements']
  //#swagger.description = 'Returns one achievement based on a provided ID.'
  try {
    await dbase.connectDB();
    if (!MongoObjectId.isValid(req.params.id)) {
      res.status(400).json('You must provide a valid Achievement ID.');
    }
    const userId = new MongoObjectId(req.params.id);
    const result = await dbase
      .getDb()
      .db(databaseName)
      .collection(collectName)
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

/**
 * Creates one object to be registered to the Achievements collection.
 *
 * Node Express async function that connects to the database, inserts a new Achievement record via POST request. The request is forwarded via Express Router from achievements.js
 * @version 1.0.2
 *
 * @param {*} req The request is forwarded through Express router. See achievements.js
 * @param {*} res The response acknowledges success with a 201 code
 */
const createAchievement = async (req, res) => {
  //#swagger.tags = ['Achievements']
  //#swagger.description = 'Creates one achievement object and adds it to the database.'
  /*#swagger.parameters['body'] = {
    in: 'body',
    description: 'Achievement object',
    schema: {'$ref': '#/definitions/Achievement'}
  }
  */
  try {
    const newAchievement = await Schema.validateAsync(req.body);

    await dbase.connectDB();
    const result = await dbase
      .getDb()
      .db(databaseName)
      .collection(collectName)
      .insertOne(newAchievement);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res
        .status(500)
        .json(result.error || 'Error: Something went wrong while creating the new achievement.');
    }
  } catch (e) {
    if (e.isJoi === true) {
      res.status(422).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

/**
 * Updates one object to be registered to the Achievements collection.
 *
 * Node Express async function that connects to the database, inserts a new Achievements record to replace an old equivalent via PUT request. The request is forwarded via Express Router from achievements.js
 * @version 1.0.2
 *
 * @param {*} req The request is forwarded through Express router. See achievements.js
 * @param {*} res The response acknowledges that the change was sent to server with 204 code.
 */
const updateAchievement = async (req, res) => {
  //#swagger.tags = ['Achievements']
  //#swagger.description = 'Updates one achievement based on a provided ID.'
  /*#swagger.parameters['body'] = {
    in: 'body',
    description: 'Achievement object',
    schema: {'$ref': '#/definitions/Achievement'}
  }
  */
  try {
    await dbase.connectDB();

    if (!MongoObjectId.isValid(req.params.id)) {
      res.status(400).json('You must provide a valid Achievement ID.');
    } else {
      const userId = new MongoObjectId(req.params.id);

      const newAchievement = await Schema.validateAsync(req.body);

      const result = await dbase
        .getDb()
        .db(databaseName)
        .collection(collectName)
        .replaceOne({ _id: userId }, newAchievement);
      if (result.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res
          .status(500)
          .json(result.error || 'Error: Something went wrong while updating the achievement.');
      }
    }
  } catch (e) {
    if (e.isJoi === true) {
      res.status(422).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

/**
 * Deletes one object from the Achievements collection.
 *
 * Node Express async function that connects to the database, deletes an Achievements record via DELETE request. The request is forwarded via Express Router from achievements.js
 * @version 1.0.2
 *
 * @param {*} req The request is forwarded through Express router. See achievements.js
 * @param {*} res The response acknowledges success with a 200 code
 */
const deleteAchievement = async (req, res) => {
  //#swagger.tags = ['Achievements']
  //#swagger.description = 'Deletes one achievement from the database associated to a provided ID.'
  try {
      if (!MongoObjectId.isValid(req.params.id)) {
        /* #swagger.responses[400] = {
              description: 'A valid User ID must be provided.',
            }
          */
        res.status(400).json('You must provide a valid User ID.');
      } else {
      await dbase.connectDB();
      const userId = new MongoObjectId(req.params.id);
      const result = await dbase
        .getDb()
        .db(databaseName)
        .collection(collectName)
        .deleteOne({ _id: userId });
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res
          .status(500)
          .json(result.error || 'Error: Something went wrong while deleting the achievement.');
      }
    }
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  getAllAchievements,
  getOneAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
