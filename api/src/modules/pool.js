const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "blog",
  password: "",
  waitForConnections: true,
  connectionLimit: 30,
  dateStrings: true,
});
module.exports = pool;