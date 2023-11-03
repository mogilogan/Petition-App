

const jwt = require('jsonwebtoken')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')




const getStatus = (req, res, next) => {
    const {petition_id } = req.body

    console.log(petition_id);
  
    pool.query(
      "SELECT petition_info.*, petition_dept.dept,petition_dept.remarks AS deptremarks,date(petition_dept.assigned_time) AS dept_time, petition_subdept.sub_dept,petition_subdept.remarks AS subremarks,petition_subdept.assigned_time AS sub_time, petition_circle.circle_insp, petition_username.user_name,petition_username.assigned_time AS sho_time FROM petition_info LEFT JOIN petition_dept ON petition_dept.petition_id = petition_info.petition_id LEFT JOIN petition_subdept ON petition_subdept.petition_id = petition_info.petition_id  LEFT JOIN petition_circle ON petition_circle.petition_id = petition_info.petition_id LEFT JOIN petition_username ON petition_username.petition_id = petition_info.petition_id WHERE petition_info.petition_id = '" + petition_id + "' ",
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
