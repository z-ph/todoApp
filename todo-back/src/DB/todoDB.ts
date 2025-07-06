import fs from "fs";
import path from "path";
export interface Todo {
  id: number;
  content: string;
  completed: boolean;
  removed: boolean;
}
export interface DBType {
  all: Record<number, Todo>;
}
export type FilterFn = {
  all: (todo: Todo) => boolean;
  completed: (todo: Todo) => boolean;
  removed: (todo: Todo) => boolean;
  notCompleted: (todo: Todo) => boolean;
  notRemoved: (todo: Todo) => boolean;
};
export const filterFn: FilterFn = {
  all: (todo: Todo) => true,
  completed: (todo: Todo) => todo.completed,
  removed: (todo: Todo) => todo.removed,
  notCompleted: (todo: Todo) => !todo.completed,
  notRemoved: (todo: Todo) => !todo.removed,
};
export type FilterType = keyof FilterFn;

class TodoDB {
  private _datebase: DBType = {
    all: {},
  };
  static instance: TodoDB;
  constructor() {
    this.load();
  }
  private dataFile = path.resolve(__dirname, "../../todoData.json");
  private load() {
    if (!fs.existsSync(this.dataFile)) {
      fs.writeFileSync(
        this.dataFile,
        JSON.stringify(this._datebase, null, 2),
        "utf-8"
      );
      return;
    }
    try {
      const data = fs.readFileSync(this.dataFile, "utf-8");
      this._datebase = JSON.parse(data);
    } catch (e) {
      console.log(e);
    }
  }
  private store() {
    try {
      fs.writeFileSync(
        this.dataFile,
        JSON.stringify(this._datebase, null, 2),
        "utf-8"
      );
    } catch (error) {
      console.log(error);
    }
  }
  private getAll() {
    return Object.values(this._datebase.all);
  }
  private getCompleted() {
    return this.getAll().filter(filterFn.completed);
  }
  private getRemoved() {
    return this.getAll().filter(filterFn.removed);
  }
  newTodo(content: Todo["content"]) {
    return {
      id: Date.now(),
      content,
      completed: false,
      removed: false,
    };
  }
  //增
  addTodo(content: Todo["content"]): Todo {
    const todo = this.newTodo(content);
    // 检查id是否重复
    const oldTodo = this._datebase.all[todo.id];
    if (oldTodo) {
      // 重复了，重新添加，重新生成id，
      // 有爆栈的隐患
      return this.addTodo(content);
    }
    this._datebase.all[todo.id] = todo;
    this.store();
    return todo;
  }
  //修
  modifyTodo<T extends Todo>(id: Todo["id"], newTodo: Partial<Omit<T, "id">>) {
    try {
      const todo = this._datebase.all[id];
      if (!todo) {
        return;
      }
      this._datebase.all[id] = { ...todo, ...newTodo };
      this.store();
      return { id, ...newTodo };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  //删
  removeTodo(id: Todo["id"]) {
    this._datebase.all[id].removed = true;
    this.store();
    return {
      id,
      removed: this.findTodo(id)?.removed,
    };
  }

  //查
  getFiltered(filter: keyof FilterFn) {
    switch (filter) {
      case "completed":
        return this.getCompleted();
      case "removed":
        return this.getRemoved();
      case "notCompleted":
        return this.getNotCompleted();
      case "notRemoved":
        return this.getNotRemoved();
      default:
        return this.getAll();
    }
  }
  private getNotCompleted() {
    return this.getAll().filter(filterFn.notCompleted);
  }
  private getNotRemoved() {
    return this.getAll().filter(filterFn.notRemoved);
  }
  findTodo(id: Todo["id"]) {
    return this._datebase.all[id];
  }
  clearDeleted() {
    this._datebase.all = this.getNotRemoved();
    this.store();
  }
}
function getDB() {
  if (!TodoDB.instance) {
    TodoDB.instance = new TodoDB();
  }
  return TodoDB.instance;
}

export default getDB;
