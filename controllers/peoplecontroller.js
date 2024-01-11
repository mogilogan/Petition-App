const jwt = require("jsonwebtoken");
const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const getStatus = (req, res, next) => {
  const { search_item, search_by } = req.body;

  let query = "";

  switch (search_by) {
    case "id":
      query = "petition_info.petition_id ='" + search_item + "'";
      break;
    case "date":
      query = "DATE(petition_info.time_stamp) ='" + search_item + "'";
      break;
    case "mobile":
      console.log(search_item);
      query = "petition_info.mobile_num ='" + search_item + "'";
      break;
    case "mail":
      query = "petition_info.mail='" + search_item + "'";
      break;

    default:
      res.status(404).send(`complain with ${search_by} does not exist.`);
      break;
  }

  pool.query(
    `SELECT petition_info.*, petition_dept.dept,petition_dept.remarks AS deptremarks,date(petition_dept.assigned_time) AS dept_time,\
       petition_subdept.sub_dept,petition_subdept.remarks AS subremarks,petition_subdept.assigned_time AS sub_time,\
       petition_circle.remarks AS circleremarks, petition_circle.circle_insp, petition_circle.assigned_time AS circle_time,\
        petition_username.user_name,petition_username.remarks AS shoremarks, petition_username.assigned_time AS sho_time\
          FROM petition_info LEFT JOIN petition_dept ON petition_dept.petition_id = petition_info.petition_id \
         LEFT JOIN petition_subdept ON petition_subdept.petition_id = petition_info.petition_id \
          LEFT JOIN petition_circle ON petition_circle.petition_id = petition_info.petition_id \
          LEFT JOIN petition_username ON petition_username.petition_id = petition_info.petition_id \
          WHERE ${query} `,
    (err, results) => {
      if (err) return handleSQLError(res, err);

      console.log(results);

      if (!results.length)
        return res
          .status(404)
          .send(`complain with ${search_by} does not exist.`);

      return res.status(201).json({
        message: "Complain fetched successfully",
        petition: results,
      });
    }
  );
};

module.exports = { getStatus };
