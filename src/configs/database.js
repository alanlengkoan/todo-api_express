import dotEnv from 'dotenv';
import mySql from 'mysql';

dotEnv.config({
    path: './.env',
});

var connection = mySql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
});

export default connection;