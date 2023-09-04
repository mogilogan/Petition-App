const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

// JOIN TABLE funcionality on login, to create new table that holds only those notes associated with that users user_id?

// @desc    verifies login credentials
// @route   POST /
const userLogin = (req, res, next) => {
  const { user_name, password } = req.body

  pool.query(
    "SELECT * FROM user WHERE user_name = '" + user_name + "' ",
    (err, results) => {
      if (err) return handleSQLError(res, err)
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name "${user_name}" does not exist.`)

     
      const hash = results[0]._password

      bcrypt.compare(password, hash).then((result) => {
      
        if (result === false) {
          return res.status(400).json({ error: 'Invalid Password' })
        } else if (result === true) {
          const userData = { ...results[0] }

          const token = jwt.sign(
            {
              userData
            },
            'secret',
            { expiresIn: 60 * 10 }
          )

          return res.status(201).json({
            result: token,userData
          });
        }
      })
    }
  )
}


module.exports = { userLogin}