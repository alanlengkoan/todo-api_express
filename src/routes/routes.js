import express from "express";
import {
    body
} from 'express-validator';

import {
    home,
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    delTodoItem
} from "../controllers/api.js";

const router = express.Router();

router.get("/", home);

// begin:: api
router.get("/todo-item", getAllTodoItem);
router.get("/todo-item/:id", getDetailTodoItem);
router.post("/todo-item", [
    body("title").notEmpty().withMessage("title cannot be null"),
    body("activity_group_id").notEmpty().withMessage("activity_group_id cannot be null")
], addTodoItem);
router.delete("/todo-item/:id", delTodoItem);
// end:: api

export default router;