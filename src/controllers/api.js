import {
    customAlphabet
} from "nanoid";
import {
    validationResult
} from "express-validator";

import mySql from "./../../src/configs/database.js";

const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to the TODO API v1.0.0",
    });
};

const getAllTodoItem = (req, res) => {
    mySql.query("SELECT * FROM todo", (error, results, fields) => {
        if (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error['sqlMessage'],
                data: {}
            });
        } else {
            if (req.query.activity_group_id === undefined) {
                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: results,
                });
            } else {
                const activityGroupId = parseInt(req.query.activity_group_id);

                res.status(200).json({
                    status: "Success",
                    message: "Success",
                    data: results.filter((n) => n.activity_group_id === activityGroupId),
                });
            }
        }
    });
};

const getDetailTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    mySql.query("SELECT * FROM todo", (error, results, fields) => {
        if (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error['sqlMessage'],
                data: {}
            });
        } else {
            const todo = results.filter((n) => n.id === id)[0];

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
        }
    });
};

const addTodoItem = (req, res) => {
    const nanoid = customAlphabet('1234567890', 2);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg,
            data: {}
        });
    }

    const id = nanoid();
    const title = req.body.title;
    const activity_group_id = req.body.activity_group_id;
    const is_active = true;
    const priority = "very-high";
    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = created_at;

    mySql.query('INSERT INTO todo SET ?', {
        id: id,
        title: title,
        activity_group_id: activity_group_id,
        is_active: is_active,
        priority: priority,
        created_at: created_at,
        updated_at: updated_at
    }, function (error, results, fields) {
        if (error) {
            return res.status(400).json({
                status: "Bad Request",
                message: error['sqlMessage'],
                data: {}
            });
        } else {
            return res.status(200).json({
                status: "Success",
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
        }
    });
};

const updTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    mySql.query("SELECT * FROM todo", (error, results, fields) => {
        if (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error['sqlMessage'],
                data: {}
            });
        } else {
            const todo = results.filter((n) => n.id === id)[0];

            if (todo !== undefined) {

                const errors = validationResult(req);

                if (!errors.isEmpty()) {
                    return res.status(400).json({
                        status: "Bad Request",
                        message: errors.array()[0].msg,
                        data: {}
                    });
                }

                const title = req.body.title;
                const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const activity_group_id = todo.activity_group_id;
                const priority = todo.priority;
                const is_active = req.body.is_active ? 1 : 0;
                const created_at = todo.created_at;
                const deleted_at = todo.deleted_at;

                mySql.query('UPDATE todo SET ? WHERE id = ?', [{
                    title: title,
                    is_active: req.body.is_active,
                    updated_at: updated_at,
                }, id], function (error, results, fields) {
                    if (error) {
                        return res.status(400).json({
                            status: "Bad Request",
                            message: error['sqlMessage'],
                            data: {}
                        });
                    } else {
                        return res.status(200).json({
                            status: "Success",
                            message: "Success",
                            data: {
                                id,
                                activity_group_id,
                                title,
                                is_active,
                                priority,
                                created_at,
                                updated_at,
                                deleted_at
                            }
                        });
                    }
                });
            } else {
                res.status(404).json({
                    status: "Not Found",
                    message: `Todo with ID ${id} Not Found!`,
                    data: {},
                });
            }
        }
    });
};

const delTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    mySql.query("SELECT * FROM todo", (error, results, fields) => {
        if (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error['sqlMessage'],
                data: {}
            });
        } else {
            const todo = results.filter((n) => n.id === id)[0];

            if (todo !== undefined) {
                mySql.query('DELETE FROM todo WHERE id = "' + id + '"', (error, results, fields) => {
                    if (error) {
                        return res.status(400).json({
                            status: "Bad Request",
                            message: error['sqlMessage'],
                            data: {}
                        });
                    } else {
                        return res.status(200).json({
                            status: "Success",
                            message: "Success",
                            data: {},
                        });
                    }
                });
            } else {
                return res.status(404).json({
                    status: "Not Found",
                    message: `Todo with ID ${id} Not Found`,
                    data: {},
                });
            }
        }
    });
};

export {
    home,
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    updTodoItem,
    delTodoItem
};