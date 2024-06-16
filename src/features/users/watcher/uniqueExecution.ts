export type UniqueExecutionCallback = () => Promise<void> | void;

interface uniqueExecutionOptions {
  callback: UniqueExecutionCallback;
}
interface ExecutionManager {
  done: boolean;
  func: UniqueExecutionCallback;
}

interface Manager {
  queue: ExecutionManager[];
}

const manager: Manager = {
  queue: [],
};

const startManager = (): void => {
  setInterval(() => runTasks(), 1000);
};

async function runTasks() {
  const nextTask = manager.queue.filter((v) => !v.done);
  for (let x = 0; x < nextTask.length; x += 1) {
    const task = nextTask[x];
    await task.func();
    task.done = true;
  }
  startManager();
}

export const uniqueExecution = ({ callback }: uniqueExecutionOptions): void => {
  manager.queue.push({
    done: false,
    func: callback,
  });
  startManager();
};
