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
    "SELECT * FROM users WHERE user_name = '" + user_name + "' ",
    (err, results) => {
      if (err) return handleSQLError(res, err)
      if (!results.length)
        return res
          .status(404)
          .send(`User with user_name "${user_name}" does not exist.`)
      console.log(results[0]._password);
      const hash = results[0]._password

      bcrypt.compare(password, hash).then((result) => {
        console.log('hashed', result)
        if (result === false) {
          return res.status(400).json({ error: 'Invalid Password' })
        } else if (result === true) {
          const userData = { ...results[0] }
          userData._password = 'Hashed'

          const token = jwt.sign(
            {
              userData
            },
            'secret',
            { expiresIn: 60 * 10 }
          )

          return res.status(201).json({
            token
          })
        }
      })
    }
  )
}

// @desc    adds new user info to db
// @route   POST /signup
const newUserSignup = (req, res, next) => {
  const { name,user_name,password,ph_num,dept_id,cate_id } = req.body

  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, function (err, hash) {
    if (err) return handleSQLError(res, err)
    
    console.log(hash);
    pool.query(
      "INSERT INTO users (_name,user_name,_password,ph_num,dept_id,cate_id) VALUES ('" +
        name +
        "', '" +
        user_name +
        "', '" +
        hash +
        "', '" +
        ph_num +
        "', '" +
        dept_id +
        "', '" +
        cate_id +
        "')",
      (err, results) => {
        if (err) {
          if (err.code === 'ER_DUP_ENTRY')
            return res.status(409).send(`Email "${user_name}" is already taken.`)
          return handleSQLError(res, err)
        }
        return res.status(201).json({
          message: 'User Successfully Created',
          new_user: { name: name, password: password, user_id: results.insertId }
        })
      }
    )
  })
}

module.exports = { userLogin, newUserSignup }