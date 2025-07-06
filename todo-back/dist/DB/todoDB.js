"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterFn = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.filterFn = {
    all: (todo) => true,
    completed: (todo) => todo.completed,
    removed: (todo) => todo.removed,
    notCompleted: (todo) => !todo.completed,
    notRemoved: (todo) => !todo.removed,
};
class TodoDB {
    constructor() {
        this._datebase = {
            all: {},
        };
        this.dataFile = path_1.default.resolve(__dirname, "../../todoData.json");
        this.load();
    }
    load() {
        if (!fs_1.default.existsSync(this.dataFile)) {
            fs_1.default.writeFileSync(this.dataFile, JSON.stringify(this._datebase, null, 2), "utf-8");
            return;
        }
        try {
            const data = fs_1.default.readFileSync(this.dataFile, "utf-8");
            this._datebase = JSON.parse(data);
        }
        catch (e) {
            console.log(e);
        }
    }
    store() {
        try {
            fs_1.default.writeFileSync(this.dataFile, JSON.stringify(this._datebase, null, 2), "utf-8");
        }
        catch (error) {
            console.log(error);
        }
    }
    getAll() {
        return Object.values(this._datebase.all);
    }
    getCompleted() {
        return this.getAll().filter(exports.filterFn.completed);
    }
    getRemoved() {
        return this.getAll().filter(exports.filterFn.removed);
    }
    newTodo(content) {
        return {
            id: Date.now(),
            content,
            completed: false,
            removed: false,
        };
    }
    //增
    addTodo(content) {
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
    modifyTodo(id, newTodo) {
        try {
            const todo = this._datebase.all[id];
            if (!todo) {
                return;
            }
            this._datebase.all[id] = Object.assign(Object.assign({}, todo), newTodo);
            this.store();
            return Object.assign({ id }, newTodo);
        }
        catch (error) {
            console.log(error);
            return error;
        }
    }
    //删
    removeTodo(id) {
        var _a;
        this._datebase.all[id].removed = true;
        this.store();
        return {
            id,
            removed: (_a = this.findTodo(id)) === null || _a === void 0 ? void 0 : _a.removed,
        };
    }
    //查
    getFiltered(filter) {
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
    getNotCompleted() {
        return this.getAll().filter(exports.filterFn.notCompleted);
    }
    getNotRemoved() {
        return this.getAll().filter(exports.filterFn.notRemoved);
    }
    findTodo(id) {
        return this._datebase.all[id];
    }
    clearDeleted() {
        this._datebase.all = this.getNotRemoved().reduce((acc, cur) => {
            acc[cur.id] = cur;
            return acc;
        }, {});
        this.store();
    }
}
function getDB() {
    if (!TodoDB.instance) {
        TodoDB.instance = new TodoDB();
    }
    return TodoDB.instance;
}
exports.default = getDB;
