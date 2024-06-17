import debug from "debug";
import { COLLECTION_USERS, UserDocument } from "../model";
import { getDb } from "../../../services";
import { emitter } from "../emitter";

const logger = debug("features:users:watcher");

interface DataProps {
  data: UserDocument[];
}

export const status: DataProps = {
  data: [],
};

const watch = async () => {
  try {
    logger("Watching changes in users");

    const users = (await getDb()
      .collection<UserDocument>(COLLECTION_USERS)
      .find()
      .toArray()) as UserDocument[];

    status.data = users;

    emitter.on(emitter.initial_users, () => {
      emitter.emit(emitter.list_users, status.data);
    });
  } catch (error) {
    logger("Error watching users: %O", error);
  }
};

// wait for the database to be ready
setTimeout(() => {
  watch();
}, 1000);
