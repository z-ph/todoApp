"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const todo_1 = __importDefault(require("./routes/todo"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
// monitor req
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log("body:", req.body);
    next();
});
app.use("/api/todo", todo_1.default);
const PORT = 1234;
app.listen(PORT, () => {
    console.log("http://localhost:" + PORT);
});
