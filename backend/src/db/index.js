const mysql = require("mysql2/promise");

class MySQLConnection {
  constructor() {
    this.Init();
    // console.log('constructor.....................')
  }

  Init() {
    this.pool = mysql.createPool({
      host: "localhost",
      user: "root",
      password: "123",
      // password: "root",
      database: "BlogDB",
    });
  }

  async Query(queryString) {
    const [rows, fields] = await this.pool.query(queryString);
    return { rows, fields };
  }
}

module.exports = new MySQLConnection();
