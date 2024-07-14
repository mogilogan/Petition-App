const mysql = require("mysql");
const colors = require("colors");

class Connection {
  constructor() {
    if (!this.pool) {
      console.log("creating MySQL connection...".blue.bold);
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: "localhost",
        user: "username",
        password: "Chicken$4",
        database: "pms_123",
        port: 3306,
        multipleStatements: true,
      });

      return this.pool;
    }

    return this.pool;
  }
}

const instance = new Connection();

module.exports = instance;
