

const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')




const getStatus = (req, res, next) => {
    const {petition_id } = req.body

    console.log(petition_id);
  
    pool.query(
      "SELECT * FROM petition_info WHERE petition_id = '" + petition_id + "' ",
      (err, results) => {

        if (err) return handleSQLError(res, err)

        if (!results.length)
          return res
            .status(404)
            .send(`complain with id "${petition_id}" does not exist.`)
        console.log(results[0]);

        return res.status(201).json({
            message: 'Complain fetched successfully',
            petition: results[0],
          })
      
      }
    )
  }


  module.exports = { getStatus }
