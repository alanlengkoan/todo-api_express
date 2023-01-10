import {
    validationResult
} from "express-validator";

import {
    Activity
} from "../../models/activity.js";

const getAllActivityGroup = async (req, res) => {
    try {
        const activity = await Activity.findAll();

        res.status(200).json({
            status: "Success",
            message: "Success",
            data: activity,
        });
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const getDetailActivityGroup = async (req, res) => {
    try {
        const id = req.params.id;

        const activity = await Activity.findByPk(id);

        if (activity === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found`,
                data: {},
            });
        }

        res.status(200).json({
            status: "Success",
            message: "Success",
            data: activity,
        });
    } catch (error) {
        res.status(400).json({
            status: "Bad Request",
            message: error,
            data: {}
        });
    }
};

const addActivityGroup = async (req, res) => {
    try {
        const {
            title,
            email,
        } = req.body;

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

        const activity = await Activity.create({
            title: title,
            email: email,
            created_at: created_at,
            updated_at: updated_at
        });

        res.status(201).json({
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
};

const updActivityGroup = async (req, res) => {
    try {
        const id = req.params.id;

        const activity = await Activity.findByPk(id);

        if (activity === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found`,
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
        const updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            await Activity.update({
                title: title,
                updated_at: updated_at
            }, {
                where: {
                    id: id
                }
            });

            res.status(200).json({
                status: "Success",
                message: "Success",
                data: await Activity.findByPk(id)
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

const delActivityGroup = async (req, res) => {
    try {
        const id = req.params.id;

        const activity = await Activity.findByPk(id);

        if (activity === null) {
            return res.status(404).json({
                status: "Not Found",
                message: `Activity with ID ${id} Not Found`,
                data: {},
            });
        }

        const deleted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');

        try {
            await Activity.update({
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
    getAllActivityGroup,
    getDetailActivityGroup,
    addActivityGroup,
    updActivityGroup,
    delActivityGroup
};