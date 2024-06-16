import debug from "debug";
import {
  MongoClient,
  Db,
  ObjectId,
  InsertOneResult,
  InsertManyResult,
  UpdateResult,
  DeleteResult,
} from "mongodb";
import { MONGO_URL } from "../../constants/mongo";

const logger = debug("services:mongo");
const client = new MongoClient(MONGO_URL);

const status: { db: Db | null } = { db: null };

const connect = async () => {
  try {
    logger(`Connecting to MongoDB: ${MONGO_URL}`);
    await client.connect();
    status.db = client.db("local");
  } catch (error) {
    logger(`Error connecting to MongoDB: ${error}`);
  }
};

connect();

const getDb = () => {
  if (!status.db) {
    throw new Error("Database not connected");
  }
  return status.db;
};

export {
  client,
  getDb,
  ObjectId,
  InsertOneResult,
  InsertManyResult,
  UpdateResult,
  DeleteResult,
  connect,
};
