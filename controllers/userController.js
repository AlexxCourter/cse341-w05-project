/**
 * @file User controller handles callbacks for API calls requested by the client related to Users in the database.
 * @author Alexander DK Courter
 * @version 1.0.2
 * 
 * 1.0.2 - wrapped functions in try-catch blocks to handle errors. Separation of error handling managed by conditionals.
 * 1.0.1 - updated with basic error handling
 */

//import necessary modules
const { ObjectId } = require('mongodb');
const database = require('../db/connector');
const {postUserSchema} = require('../validation/validation_schema');
//name of database and collection to be referenced by this controller
const dbName = 'GoalAchievement'; //enter with exact capitalization
const collName = 'users';

/**
 * Returns all objects registered to the Users collection.
 * 
 * Node Express async function that connects to the database, finds a result (all users), then returns it via an HTTP response. The request is forwarded via Express Router from user.js
 * @version 1.0.2
 * 
 * @param {*} req The request is forwarded through Express router. See user.js
 * @param {*} res The response is given for a GET request that gets all records
 */
const getAllUsers = async (req, res) => {
  try{
    await database.connectDB();
    const result = await database.getDb().db(dbName).collection(collName).find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      if(lists.length > 0){
        res.status(200).json(lists);
      } else {
        //error response when an empty dataset is returned
        res.status(400).json('Could not get Users due to a problem fetching from the database.');
      }
      
    });
  } catch(e) {
    res.status(500).json(e.message);
  }
  
};

/**
 * Returns one object registered to the Users collection using a specified object ID.
 * 
 * Node Express async function that connects to the database, finds a result (one user), then returns it via an HTTP response. The request is forwarded via Express Router from user.js
 * @version 1.0.2
 * 
 * @param {*} req The request is forwarded through Express router. See user.js
 * @param {*} res The response is given for a GET request that gets one record
 */
const getOneUser = async (req, res) => {
  await database.connectDB();

  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json("You must provide a valid User ID.");
  } else {
    const userId = new ObjectId(req.params.id);

    const result = await database.getDb().db(dbName).collection(collName).find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      if(lists.length > 0){
        res.status(200).json(lists[0]);
      } else {
        //error response when an empty dataset is returned
        res.status(400).json('Could not get User due to a problem fetching from the database.');
      }
    });
  }
};

/**
 * Creates one object to be registered to the Users collection.
 * 
 * Node Express async function that connects to the database, inserts a new User record via POST request. The request is forwarded via Express Router from user.js
 * @version 1.0.2
 * 
 * @param {*} req The request is forwarded through Express router. See user.js
 * @param {*} res The response acknowledges success with a 201 code
 */
const createUser = async (req, res) => {
  // const newUser = {
  //   username: req.body.userName,
  //   email: req.body.email,
  //   pass: req.body.pass, //need to use OAuth and password hashing
  //   bio: req.body.bio,
  //   achievements: req.body.achievements,
  //   points: req.body.points,
  //   createdDate: req.body.createdDate
  // };
  try {
    const newUser = await postUserSchema.validateAsync(req.body);

    await database.connectDB();
    const result = await database.getDb().db(dbName).collection(collName).insertOne(newUser);
    if (result.acknowledged) {
      res.status(201).json(result);
    } else {
      res.status(500).json(result.error || 'Error: Something went wrong while creating the User.');
    }
  } catch(e){
    if(e.isJoi === true) {
      res.status(422).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

/**
 * Updates one object to be registered to the Users collection.
 * 
 * Node Express async function that connects to the database, inserts a new User record to replace an old equivalent via PUT request. The request is forwarded via Express Router from user.js
 * @version 1.0.2
 * 
 * @param {*} req The request is forwarded through Express router. See user.js
 * @param {*} res The response reports success with a 204 code
 */
const updateUser = async (req, res) => {
  await database.connectDB();

  try {
    //validate the object id
  if(!ObjectId.isValid(req.params.id)){
    res.status(400).json("You must provide a valid User ID.");
  } else {

    const userId = new ObjectId(req.params.id);

    const newUser = await postUserSchema.validateAsync(req.body);
  
    const result = await database
      .getDb()
      .db(dbName)
      .collection(collName)
      .replaceOne({ _id: userId }, newUser);
    if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(result.error || 'Error: Something went wrong while updating the User.');
    }
  }
  } catch(e){
    if(e.isJoi === true) {
      res.status(422).json(e.message);
    } else {
      res.status(500).json(e.message);
    }
  }
};

/**
 * Deletes one object to be registered to the Users collection.
 * 
 * Node Express async function that connects to the database, deletes a User record via DELETE request. The request is forwarded via Express Router from user.js
 * @version 1.0.2
 * 
 * @param {*} req The request is forwarded through Express router. See user.js
 * @param {*} res The response acknowledges success with a 200 code
 */
const deleteUser = async (req, res) => {
  try{
    await database.connectDB();

    if(!ObjectId.isValid(req.params.id)){
      res.status(400).json("You must provide a valid User ID.");
    } else {
      const userId = new ObjectId(req.params.id);
      const result = await database.getDb().db(dbName).collection(collName).deleteOne({ _id: userId });
      if (result.deletedCount > 0) {
        res.status(200).send();
      } else {
        res.status(500).json(result.error || 'Error: Something went wrong while deleting the User.');
      }
    }
  } catch(e){
    res.status(500).json(e.message);
  }
  
 
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
};
