type UniqueExecutionCallback = () => Promise<void> | void;

interface uniqueExecutionOptions {
  callback: UniqueExecutionCallback;
}
interface ExecutionManager {
  done: boolean;
  func: UniqueExecutionCallback;
}
interface Manager {
  queue: ExecutionManager[];
  interval?: NodeJS.Timeout;
}

const manager: Manager = {
  queue: [],
};

const isAllDone = () =>
  manager.queue.reduce((acc, cur) => cur.done && acc, true);

const stopManager = (): void => {
  if (manager.interval) clearInterval(manager.interval);
  manager.interval = undefined;
};

const startManager = (): void => {
  setInterval(() => runTasks(), 1000);
};

const runTasks = async () => {
  stopManager();
  const nextTask = manager.queue.filter((v) => !v.done);
  for (let x = 0; x < nextTask.length; x += 1) {
    const task = nextTask[x];
    await task.func();
    task.done = true;
  }
  if (!isAllDone) startManager();
};

export const uniqueExecution = ({ callback }: uniqueExecutionOptions): void => {
  manager.queue.push({
    done: false,
    func: callback,
  });
  startManager();
};
