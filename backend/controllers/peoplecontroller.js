

const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')




const getComplain = (req, res, next) => {
    const {complain_id,ph_num } = req.body
  
    pool.query(
      "SELECT * FROM petition WHERE complain_id = '" + complain_id + "' ",
      (err, results) => {
        if (err) return handleSQLError(res, err)
        if (!results.length)
          return res
            .status(404)
            .send(`complain with id "${complain_id}" does not exist.`)
        console.log(results[0]);

        return res.status(201).json({
            message: 'Complain fetched successfully',
            complain: results[0],
            
          })
      
  
       
          
        
      }
    )
  }


  module.exports = { getComplain}
