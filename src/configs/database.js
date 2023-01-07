import dotEnv from 'dotenv';
import {
    Sequelize
} from 'sequelize';

dotEnv.config({
    path: './.env',
});

const sequelize = new Sequelize(process.env.MYSQL_DBNAME, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT
});

export default sequelize;