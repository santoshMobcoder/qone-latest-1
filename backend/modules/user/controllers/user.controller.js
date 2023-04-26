const { successResponse } = require("../../../utils/response/response.handler");
const { connect } = require("../../../db/dbConn");
const { ObjectId } = require("mongodb");

async function addItems(req, res) {
  const db = await connect();
  const { items } = req.body;
  const set = items;

  const status = await db.collection("items").insertMany(set);
  return successResponse({ req, res, data: status });
}

async function listItems(req, res) {
  const db = await connect();
  const status = await db.collection("items").find().toArray();
  return successResponse({ req, res, data: status });
}

async function deleteItems(req, res) {
  const { id: _id } = req.params;
  const db = await connect();
  const status = await db
    .collection("items")
    .deleteOne({ _id: new ObjectId(_id) });
  return successResponse({ req, res, data: status });
}

async function updateItem(req, res) {
  const { id: _id } = req.params;
  const { itemName, state } = req.body;
  const db = await connect();
  const status = await db
    .collection("items")
    .updateOne({ _id: new ObjectId(_id) }, { $set: { itemName, state } });
  return successResponse({ req, res, data: status });
}

// check of the unique item name
async function isUniqueItem(req, res) {
  const { itemName, id } = req.body;
  const db = await connect();

  const filter = {
    itemName: new RegExp(`^${itemName}$`,'i'),
    ...(id
      ? {
          _id: {
            $nin: [new ObjectId(id)],
          },
        }
      : null),
  };
  const status = await db.collection("items").findOne(filter);

  return successResponse({
    req,
    res,
    data: { status: status === null ? true : false },
  });
}

module.exports = {
  addItems,
  listItems,
  deleteItems,
  updateItem,
  isUniqueItem,
};
