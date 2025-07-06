"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todoDB_1 = __importDefault(require("../DB/todoDB"));
class TodoService {
    constructor() {
        this.todoDB = (0, todoDB_1.default)();
    }
    add(content) {
        return this.todoDB.addTodo(content);
    }
    getById(id) {
        return this.todoDB.findTodo(id);
    }
    getAll() {
        return this.todoDB.getFiltered("all");
    }
    modify(id, value) {
        return this.todoDB.modifyTodo(id, value);
    }
    remove(id) {
        return this.todoDB.removeTodo(id);
    }
    getFiltered(filterType) {
        return this.todoDB.getFiltered(filterType);
    }
    restore(id) {
        return this.todoDB.modifyTodo(id, { removed: false });
    }
    clearDeleted() {
        return this.todoDB.clearDeleted();
    }
}
function useTodoService() {
    if (!TodoService.instance) {
        TodoService.instance = new TodoService();
    }
    return TodoService.instance;
}
exports.default = useTodoService;
