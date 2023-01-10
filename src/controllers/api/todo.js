import {
    validationResult
} from "express-validator";

import {
    Todo
} from "../../models/todos.js";

const getAllTodoItem = async (req, res) => {
    try {
        const todo = await Todo.findAll();

        const data = req.query.activity_group_id === undefined ? todo : todo.filter((n) => n.activity_group_id == req.query.activity_group_id);

        res.status(200).json({
            status: "Success",
            message: "Success",
            data: data,
        });
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const getDetailTodoItem = async (req, res) => {
    try {
        const id = req.params.id;

        const todo = await Todo.findByPk(id);

        if (todo === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found`,
                data: {},
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Success",
            data: todo,
        });
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const addTodoItem = async (req, res) => {
    try {
        const {
            title,
            activity_group_id
        } = req.body;

        const is_active = true;
        const priority = 'very-high';
        const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const updated_at = created_at;

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Bad Request",
                message: errors.array()[0].msg,
                data: {}
            });
        }

        const todo = await Todo.create({
            title: title,
            activity_group_id: activity_group_id,
            is_active: is_active,
            priority: priority,
            created_at: created_at,
            updated_at: updated_at
        });

        res.status(201).json({
            status: "Success",
            message: "Success",
            data: todo.toJSON()
        });
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const updTodoItem = async (req, res) => {
    try {
        const id = req.params.id;

        const todo = await Todo.findByPk(id);

        if (todo === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found`,
                data: {},
            });
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: "Bad Request",
                message: errors.array()[0].msg,
                data: {}
            });
        }

        const title = req.body.title;
        const is_active = req.body.is_active;
        const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            await Todo.update({
                title: title,
                is_active: is_active,
                updated_at: updated_at
            }, {
                where: {
                    id: id
                }
            });

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: await Todo.findByPk(id)
            });
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error,
                data: {}
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const delTodoItem = async (req, res) => {
    try {
        const id = req.params.id;

        const todo = await Todo.findByPk(id);

        if (todo === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found`,
                data: {},
            });
        }

        const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            await Todo.update({
                deleted_at: deleted_at
            }, {
                where: {
                    id: id
                }
            });

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: {}
            });
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error,
                data: {}
            });
        }
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

export {
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    updTodoItem,
    delTodoItem
};