const { ObjectId } = require('mongodb');
const database = require('../db/connector');

const dbName = 'GoalAchievement'; //enter with exact capitalization
const collName = 'achievements';

const getAllAchievements = async (req, res) => {
  await database.connectDB();
  const result = await database.getDb().db(dbName).collection(collName).find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getOneAchievement = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);
  const result = await database.getDb().db(dbName).collection(collName).find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createAchievement = async (req, res) => {
  const newAchievement = {
    taskName: req.body.taskName,
    taskPoints: req.body.points
  };
  await database.connectDB();
  const result = await database.getDb().db(dbName).collection(collName).insertOne(newAchievement);
  if (result.acknowledged) {
    res.status(201).json(result);
  } else {
    res
      .status(500)
      .json(result.error || 'Error: Something went wrong while creating the new achievement.');
  }
};

const updateAchievement = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);

  const newAchievement = {
    taskName: req.body.taskName,
    taskPoints: req.body.points
  };

  const result = await database
    .getDb()
    .db(dbName)
    .collection(collName)
    .replaceOne({ _id: userId }, newAchievement);
  if (result.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || 'Error: Something went wrong while updating the achievement.');
  }
};

const deleteAchievement = async (req, res) => {
  await database.connectDB();
  const userId = new ObjectId(req.params.id);
  const result = await database.getDb().db(dbName).collection(collName).deleteOne({ _id: userId });
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || 'Error: Something went wrong while deleting the achievement.');
  }
};

module.exports = {
  getAllAchievements,
  getOneAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement
};
