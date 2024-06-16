import { COLLECTION_USERS } from "./schema";
import { getDb } from "../../../services";
import { CreateUserParams } from "./types";

const users = () => getDb().collection(COLLECTION_USERS);

export const createUser = ({ user }: CreateUserParams) =>
  users().insertOne(user);
