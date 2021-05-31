 const mysql = require('mysql2/promise');
 const pool = mysql.createPool({
     host: 'localhost',
     user: 'root',
     database: 'blog',
     password: '',
     waitForConnections: true,
     connectionLimit: 10,
     dateStrings: true //时间转字符串
 });
 module.exports = pool;