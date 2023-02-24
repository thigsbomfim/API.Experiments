const mysql = require('mysql2')
const conf = require('dotenv').config().parsed;

const conn = mysql.createPool({
    host: conf.HOSTNAME,
    database: conf.DATABASE,
    user: conf.USERNAME,
    password: conf.PASSWORD,
    port: conf.HOSTPORT
}).promise();

module.exports = conn;