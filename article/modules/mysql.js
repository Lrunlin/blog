const mysql = require('mysql');
const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog',
    multipleStatements:true,//允许多条语句
    timezone: "SYSTEM",//优化时间格式

});
module.exports = connection