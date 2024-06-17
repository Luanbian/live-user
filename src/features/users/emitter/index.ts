import { EventEmitter } from "stream";

class Emitter extends EventEmitter {
  initial_users = "initialUsers";
  list_users = "listUsers";
}

const emitter = new Emitter();
export { emitter };
