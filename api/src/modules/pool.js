const mysql = require("mysql2/promise");
const os = require('os');
const PASSWORD = os.type() == "Linux" ? '123' : '';//根据运行环境判断密码
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: PASSWORD,
  waitForConnections: true,
  connectionLimit: 30,
  dateStrings: true,
});
module.exports = pool;