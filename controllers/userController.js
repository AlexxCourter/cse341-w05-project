const { ObjectId } = require('mongodb');
const database = require('../db/connector');

const dbName = 'GoalAchievement'; //enter with exact capitalization
const collName = 'users';

const getAllUsers = async (req, res) => {
  await database.connectDB();
  const result = await database.getDb().db(dbName).collection(collName).find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOneUser = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);
  const result = await database.getDb().db(dbName).collection(collName).find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createUser = async (req, res) => {
  const newUser = {
    username: req.body.userName,
    email: req.body.email,
    pass: req.body.pass, //need to use OAuth and password hashing
    bio: req.body.bio,
    achievements: req.body.achievements,
    points: req.body.points,
    createdDate: req.body.createdDate
  };
  await database.connectDB();
  const result = await database.getDb().db(dbName).collection(collName).insertOne(newUser);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res.status(500).json(result.error || 'Error: Something went wrong while creating the User.');
  }
};

const updateUser = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);

  const newUser = {
    username: req.body.userName,
    email: req.body.email,
    pass: req.body.pass, //need to use OAuth and password hashing
    bio: req.body.bio,
    achievements: req.body.achievements,
    points: req.body.points,
    createdDate: req.body.createdDate
  };

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
};

const deleteUser = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);
  const result = await database.getDb().db(dbName).collection(collName).deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(result.error || 'Error: Something went wrong while deleting the User.');
  }
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser
};
