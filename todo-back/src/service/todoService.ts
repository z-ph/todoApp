import getDB, { FilterType, Todo } from "../DB/todoDB";

class TodoService {
  static instance: TodoService;
  private todoDB = getDB();

  add(content: string) {
    return this.todoDB.addTodo(content);
  }
  getById(id: number) {
    return this.todoDB.findTodo(id);
  }
  getAll() {
    return this.todoDB.getFiltered("all");
  }
  modify<T extends Todo>(id: number, value: Omit<T, "id">) {
    return this.todoDB.modifyTodo(id, value);
  }
  remove(id: number) {
    return this.todoDB.removeTodo(id);
  }
  getFiltered(filterType: FilterType) {
    return this.todoDB.getFiltered(filterType);
  }
  restore(id: number) {
    return this.todoDB.modifyTodo(id, { removed: false });
  }
  clearDeleted() {
    return this.todoDB.clearDeleted();
  }
}
function useTodoService(): TodoService {
  if (!TodoService.instance) {
    TodoService.instance = new TodoService();
  }
  return TodoService.instance;
}
export default useTodoService;
