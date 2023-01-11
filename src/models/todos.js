import {
    DataTypes
} from 'sequelize';

import sequelize from "./../configs/database.js";

const Todo = sequelize.define('Todo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    activity_group_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    is_active: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    priority: {
        type: DataTypes.STRING(25),
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'todos',
    timestamps: false
});

Todo.prototype.purge = function () {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
        if (!secrets.includes(key)) {
            clean[key] = this.dataValues[key];
        }
    }
    return clean;
};

export {
    Todo
}