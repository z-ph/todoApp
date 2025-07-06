"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todoService_1 = __importDefault(require("../service/todoService"));
const router = (0, express_1.Router)();
const todoService = (0, todoService_1.default)();
router.get("/", (req, res) => {
    const todos = todoService.getFiltered("all");
    res.json(todos);
});
router.get("/removed", (req, res) => {
    const todos = todoService.getFiltered("removed");
    res.json(todos);
});
router.post("/", (req, res) => {
    const { content } = req.body;
    const result = todoService.add(content);
    res.json({ result });
});
router.patch("/:id", (req, res) => {
    const { id } = req.params;
    const newTodo = req.body;
    const result = todoService.modify(Number(id), newTodo);
    res.json({ result });
});
router.delete("/clearDeleted", (req, res) => {
    console.log("cleatDeleted");
    const result = todoService.clearDeleted();
    res.json({ result });
});
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const result = todoService.remove(Number(id));
    res.json({ result });
});
router.post("/restore/:id", (req, res) => {
    const { id } = req.params;
    const result = todoService.restore(Number(id));
    res.json({ result });
});
exports.default = router;
