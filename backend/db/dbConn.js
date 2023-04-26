const { MongoClient } = require("mongodb");

const connectionString = process.env.ATLAS_URI || "";
const dbName = process.env.DB_NAME || "";

const client = new MongoClient(connectionString, { useNewUrlParser: true });
let conn;

async function connect() {
  try {
    conn = await client.connect();
    return conn.db(dbName);
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  connect,
};
