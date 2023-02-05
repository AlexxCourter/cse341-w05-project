const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

async function connectDB() {
  const uri = process.env.DBSTRING;

  /*
   * if deprecation warnings, add this after uri as argument:
   * , { useNewUrlParser: true, useUnifiedTopology: true }
   */
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect().then((client) => {
      _db = client;
    });
  } catch (e) {
    console.error(e);
  }
}

async function close() {
  try {
    const client = _db;
    await client.close();
  } catch (e) {
    console.error(e);
  }
}

function getDb() {
  if (!_db) {
    throw Error('Database has not been connected');
  }
  return _db;
}

// async function listDatabases(client) {
//   databaseList = await client.db().admin().listDatabases();

//   console.log('Databases:');
//   databaseList.databases.forEach((db) => console.log(`- ${db.name}`));
// }

// async function getContacts(client) {
//   let contacts = await client.db('cs341').collection('contacts').find();
//   const results = await contacts.toArray();
//   results.forEach((r) => console.log(r));
// }

module.exports = { getDb, connectDB, close };
