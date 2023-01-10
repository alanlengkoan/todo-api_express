import express from "express";
import {
    body
} from 'express-validator';

import {
    home,
} from "../controllers/home.js";

import {
    getAllActivityGroup,
    getDetailActivityGroup,
    addActivityGroup,
    updActivityGroup,
    delActivityGroup
} from "../controllers/api/activity.js";

import {
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    updTodoItem,
    delTodoItem
} from "../controllers/api/todo.js";

const router = express.Router();

router.get("/", home);

// begin:: api activity groups
router.get("/activity-groups", getAllActivityGroup);
router.get("/activity-groups/:id", getDetailActivityGroup);
router.post("/activity-groups", [
    body("title").notEmpty().withMessage("title cannot be null"),
], addActivityGroup);
router.patch("/activity-groups/:id", [
    body("title").notEmpty().withMessage("title cannot be null"),
], updActivityGroup);
router.delete("/activity-groups/:id", delActivityGroup);
// end:: api activity groups

// begin:: api todo
router.get("/todo-items", getAllTodoItem);
router.get("/todo-items/:id", getDetailTodoItem);
router.post("/todo-items", [
    body("title").notEmpty().withMessage("title cannot be null"),
    body("activity_group_id").notEmpty().withMessage("activity_group_id cannot be null")
], addTodoItem);
router.patch("/todo-items/:id", updTodoItem);
router.delete("/todo-items/:id", delTodoItem);
// end:: api todo

export default router;