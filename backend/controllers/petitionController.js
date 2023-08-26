const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')


const addPetition = (req, res, next) => {
    const { title,cate_id,complain_desc} = req.body
  
  
      pool.query(
        "INSERT INTO petition (title,cate_id,complain_desc) VALUES ('" +
          title +
          "', '" +
          cate_id +
          "', '" +
          complain_desc +
          "')",
        (err, results) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY')
              return res.status(409).send(`petition "${cate_id}" is already taken.`)
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'Petition Successfully Created',
            complain_details: { title:title , complain_id: results.complain_id }
          })
        }
      )
    
  }
  module.exports = { addPetition }