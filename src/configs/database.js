import dotEnv from 'dotenv';
import {
    Sequelize
} from 'sequelize';

dotEnv.config({
    path: './.env',
});

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

export default sequelize;