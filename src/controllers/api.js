import {
    customAlphabet
} from "nanoid";
import {
    validationResult
} from "express-validator";

import {
    Todo
} from "../models/todos.js";
import {
    Activity
} from "../models/activity.js";

const home = (req, res) => {
    res.status(200).json({
        message: "Welcome to the TODO API v1.0.0",
    });
};

const getAllTodoItem = (req, res) => {
    Todo.findAll().then((results) => {
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
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const getDetailTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    Todo.findAll().then((results) => {
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
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const addTodoItem = async (req, res) => {
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
        res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg,
            data: {}
        });
    } else {
        const data = {
            title: title,
            activity_group_id: activity_group_id,
            is_active: is_active,
            priority: priority,
            created_at: created_at,
            updated_at: updated_at
        };

        try {
            const todo = await Todo.create(data);

            res.status(200).json({
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
    }
};

const updTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    Todo.findAll().then(async (results) => {
        const todo = results.filter((n) => n.id === id)[0];

        if (todo !== undefined) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: "Bad Request",
                    message: errors.array()[0].msg,
                    data: {}
                });
            } else {
                const title = req.body.title;
                const is_active = req.body.is_active ? 1 : 0;
                const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

                const data = {
                    id: id,
                    title: title,
                    is_active: is_active,
                    updated_at: updated_at
                };

                try {
                    await Todo.update(data, {
                        where: {
                            id: id
                        }
                    });

                    Todo.findAll({
                        where: {
                            id: id
                        }
                    }).then((results) => {
                        res.status(200).json({
                            status: "Success",
                            message: "Success",
                            data: results[0].toJSON()
                        });
                    }).catch((error) => {
                        res.status(400).json({
                            status: "Bad Request",
                            message: error,
                            data: {}
                        });
                    });
                } catch (error) {
                    res.status(400).json({
                        status: "Bad Request",
                        message: error,
                        data: {}
                    });
                }
            }
        } else {
            res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found!`,
                data: {},
            });
        }
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const delTodoItem = (req, res) => {
    const id = parseInt(req.params.id);

    Todo.findAll().then(async (results) => {
        const todo = results.filter((n) => n.id === id)[0];

        if (todo !== undefined) {
            const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const data = {
                deleted_at: deleted_at
            };

            try {
                await Todo.update(data, {
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
        } else {
            res.status(404).json({
                status: "Not Found",
                message: `Todo with ID ${id} Not Found!`,
                data: {},
            });
        }
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const getAllActivityGroup = (req, res) => {
    Activity.findAll().then((results) => {
        res.status(200).json({
            status: "Success",
            message: "Success",
            data: results,
        });
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const getDetailActivityGroup = (req, res) => {
    const id = parseInt(req.params.id);

    Activity.findAll().then((results) => {
        const activity = results.filter((n) => n.id === id)[0];

        if (activity !== undefined) {
            res.status(200).json({
                status: "Success",
                message: "Success",
                data: activity,
            });
        } else {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found!`,
                data: {},
            });
        }
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const addActivityGroup = async (req, res) => {
    const {
        title,
        email,
    } = req.body;

    const created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const updated_at = created_at;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({
            status: "Bad Request",
            message: errors.array()[0].msg,
            data: {}
        });
    } else {
        const data = {
            title: title,
            email: email,
            created_at: created_at,
            updated_at: updated_at
        };

        try {
            const activity = await Activity.create(data);

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: activity.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                status: "Bad Request",
                message: error,
                data: {}
            });
        }
    }
};

const updActivityGroup = (req, res) => {
    const id = parseInt(req.params.id);

    Activity.findAll().then(async (results) => {
        const activity = results.filter((n) => n.id === id)[0];

        if (activity !== undefined) {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: "Bad Request",
                    message: errors.array()[0].msg,
                    data: {}
                });
            } else {
                const title = req.body.title;
                const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

                const data = {
                    id: id,
                    title: title,
                    updated_at: updated_at
                };

                try {
                    await Activity.update(data, {
                        where: {
                            id: id
                        }
                    });

                    Activity.findAll({
                        where: {
                            id: id
                        }
                    }).then((results) => {
                        res.status(200).json({
                            status: "Success",
                            message: "Success",
                            data: results[0].toJSON()
                        });
                    }).catch((error) => {
                        res.status(400).json({
                            status: "Bad Request",
                            message: error,
                            data: {}
                        });
                    });
                } catch (error) {
                    res.status(400).json({
                        status: "Bad Request",
                        message: error,
                        data: {}
                    });
                }
            }
        } else {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found!`,
                data: {},
            });
        }
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

const delActivityGroup = (req, res) => {
    const id = parseInt(req.params.id);

    Activity.findAll().then(async (results) => {
        const activity = results.filter((n) => n.id === id)[0];

        if (activity !== undefined) {
            const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

            const data = {
                deleted_at: deleted_at
            };

            try {
                await Activity.update(data, {
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
        } else {
            res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found!`,
                data: {},
            });
        }
    }).catch((error) => {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    });
};

export {
    home,
    getAllTodoItem,
    getDetailTodoItem,
    addTodoItem,
    updTodoItem,
    delTodoItem,
    getAllActivityGroup,
    getDetailActivityGroup,
    addActivityGroup,
    updActivityGroup,
    delActivityGroup,
};