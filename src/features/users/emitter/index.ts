import { EventEmitter } from "stream";
import { UserDocument } from "../model";

class Emitter extends EventEmitter {
  initial_users = "initialUsers";
  list_users = "listUsers";
  create_User = "createUser";

  emitCreateUser = (value: UserDocument) => {
    this.emit(this.create_User, value);
  };
}

const emitter = new Emitter();
export { emitter };
