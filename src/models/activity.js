import {
    DataTypes
} from 'sequelize';

import sequelize from "./../configs/database.js";

const Activity = sequelize.define('Activity', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
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
    tableName: 'activities',
    timestamps: false
});

Activity.prototype.purge = function () {
    const clean = {};
    for (const key of Object.keys(this.dataValues)) {
        if (!secrets.includes(key)) {
            clean[key] = this.dataValues[key];
        }
    }
    return clean;
};

export {
    Activity
}