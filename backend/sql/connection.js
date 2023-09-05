const mysql = require('mysql')
const colors = require('colors')

class Connection {
  constructor () {
    if (!this.pool) {
      console.log('creating MySQL connection...'.blue.bold)
      this.pool = mysql.createPool({
        connectionLimit: 100,
        host: '127.0.0.1',
        user: 'newuser',
        password: 'chicken$4',
        database: 'petition',
        port: 3306
      })

      return this.pool
    }

    return this.pool
  }
}

const instance = new Connection()

module.exports = instance
