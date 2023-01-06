import {
    customAlphabet
} from "nanoid";
import {
    validationResult
} from "express-validator";
import todos from "./../models/todos.js";

const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to the TODO API v1.0.0",
    });
};

const getAllTodoItem = (req, res) => {
    if (req.query.activity_group_id === undefined) {
        res.status(200).json({
            status: "Success",
            message: "Success",
            data: todos,
        });
    } else {
        const activityGroupId = req.query.activity_group_id;

        res.status(200).json({
            status: "Success",
            message: "Success",
            data: todos,
        });
    }
};

const getDetailTodoItem = (req, res) => {
    const id = req.params.id;

    const todo = todos.filter((n) => n.id === id)[0];

    if (todo !== undefined) {
        res.status(200).json({
            status: "Success",
            message: "Success",
            data: todo,
        });
    } else {
        res.status(404).json({
            status: "Not Found",
            message: `Todo with ID ${id} Not Found!`,
            data: {},
        });
    }
};

const addTodoItem = (req, res) => {
    const nanoid = customAlphabet('1234567890', 2);
    const id = nanoid();
    const created_at = new Date().toISOString();
    const updated_at = created_at;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg,
            data: {}
        });
    }

    const title = req.body.title;
    const activity_group_id = req.body.activity_group_id;
    const is_active = true;
    const priority = "very-high";

    return res.status(200).json({
        status: "success",
        message: "Success",
        data: {
            created_at,
            updated_at,
            id,
            title,
            activity_group_id,
            is_active,
            priority
        }
    });
};

const delTodoItem = (req, res) => {
    const id = req.params.id;

    res.status(200).json({
        status: "Success",
        message: `Todo with ID ${id} Deleted!`,
        data: {},
    });
};

export {
    home,
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    delTodoItem
};