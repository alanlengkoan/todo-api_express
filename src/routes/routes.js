import express from "express";
import {
    body
} from 'express-validator';

import {
    home,
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    updTodoItem,
    delTodoItem
} from "../controllers/api.js";

const router = express.Router();

router.get("/", home);

// begin:: api
router.get("/todo-items", getAllTodoItem);
router.get("/todo-items/:id", getDetailTodoItem);
router.post("/todo-items", [
    body("title").notEmpty().withMessage("title cannot be null"),
    body("activity_group_id").notEmpty().withMessage("activity_group_id cannot be null")
], addTodoItem);
router.patch("/todo-items/:id", [
    body("title").notEmpty().withMessage("title cannot be null"),
], updTodoItem);
router.delete("/todo-items/:id", delTodoItem);
// end:: api

export default router;