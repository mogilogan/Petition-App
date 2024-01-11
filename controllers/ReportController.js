const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const { sendmail } = require("./Sendmail");

const addReport = (req, res, next) => {
  const { petition_id, evidence, user_name } = req.body;
  pool.query(
    "SELECT assigned_by FROM petition_username WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).send(`Could not Add Report.`);
        return handleSQLError(res, err);
      }

      const assigned_by = results[0]?.assigned_by;
      console.log(assigned_by);

      pool.query(
        "INSERT INTO report (petition_id,evidence) VALUES ('" +
          petition_id +
          "', '" +
          evidence +
          "'); ",
        (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              //IF ALread entry is there Update the report(must be returned back)
              pool.query(
                "UPDATE report SET evidence = '" +
                  evidence +
                  " 'WHERE petition_id = " +
                  petition_id +
                  "', ';",

                (err, results) => {
                  if (err) return handleSQLError(res, err);
                }
              );
            }
            return res.status(409).send(`Could not Add Report.`);
          }

          pool.query(
            "UPDATE petition_info SET active_place = '" +
              assigned_by +
              "' WHERE petition_id = '" +
              petition_id +
              "'",
            (err, results) => {
              if (err) {
                return handleSQLError(res, err);
              }

              console.log("active plaace set");
            }
          );

          return res.status(201).json({
            message: "Petition Report Added",
            petition_id: petition_id,
          });
        }
      );
    }
  );
};

const fetchReport = (req, res) => {
  const { rank, user_name } = req.body;

  pool.query(
    "SELECT p.* FROM petition_info p  JOIN (SELECT r.* FROM report r) AS ok ON p.petition_id = ok.petition_id WHERE p.active_place = '" +
      user_name +
      "';",

    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length) return res.status(404).send(`No new Petitions`);

      return res.status(201).json({
        message: "Petitions fetched successfully",
        petitions: results,
      });
    }
  );
};

const getReport = (req, res, next) => {
  const { petition_id } = req.body;

  pool.query(
    "SELECT petition_info.*, petition_dept.dept,petition_dept.remarks AS deptremarks,date(petition_dept.assigned_time) AS dept_time,\
       petition_subdept.sub_dept,petition_subdept.remarks AS subremarks,petition_subdept.assigned_time AS sub_time,\
        petition_circle.circle_insp, petition_circle.assigned_time AS circle_time,\
        petition_username.user_name,petition_username.assigned_time AS sho_time,\
        report.evidence \
          FROM petition_info LEFT JOIN petition_dept ON petition_dept.petition_id = petition_info.petition_id \
         LEFT JOIN petition_subdept ON petition_subdept.petition_id = petition_info.petition_id \
          LEFT JOIN petition_circle ON petition_circle.petition_id = petition_info.petition_id \
          LEFT JOIN petition_username ON petition_username.petition_id = petition_info.petition_id \
          LEFT JOIN report ON report.petition_id = petition_info.petition_id \
          WHERE petition_info.petition_id = '" +
      petition_id +
      "' ",
    (err, results) => {
      if (err) return handleSQLError(res, err);

      if (!results.length)
        return res
          .status(404)
          .send(`complain with id "${petition_id}" does not exist.`);

      return res.status(201).json({
        message: "Complain fetched successfully",
        petition: results[0],
      });
    }
  );
};

const closeReport = (req, res, next) => {
  const { petition_id, close_report, active_place, rank, user_name } = req.body;
  const closed = "1";
  const validRanks = ["1", "2", "3"];

  if (validRanks.includes(rank)) {
    pool.query(
      "UPDATE petition_info\
  SET close_report = '" +
        close_report +
        "',\
      closed = '" +
        closed +
        "'\
      ,\
      closed_by = '" +
        user_name +
        "',active_place = 'CLOSED'\
  WHERE petition_id = '" +
        petition_id +
        "';",
      (err, results) => {
        if (err) {
          return handleSQLError(res, err);
        }

        console.log(petition_id);

        pool.query(
          "SELECT mail FROM petition_info\
      WHERE petition_id = '" +
            petition_id +
            "';",
          (err, results) => {
            if (err) {
              return handleSQLError(res, err);
            }

            const mail = results[0].mail;
            const closemsg = `Your Petition with id[${petition_id}] has been closed.`;

            sendmail({ mail, closemsg });
          }
        );

        return res.status(201).json({
          petition_id: petition_id,
        });
      }
    );
  } else {
    console.log("Invalid rank");
  }
};

const acceptreport = (req, res, next) => {
  const { petition_id, close_report, active_place, rank } = req.body;
  console.log(rank);

  let table_name;

  switch (rank) {
    case "2":
      table_name = "petition_dept";
      break;
    case "3":
      table_name = "petition_subdept";
      break;
    case "4":
      table_name = "petition_circle";
      break;
    case "5":
      table_name = "petition_username";
      break;
    default:
      console.log("Invalid rank");
  }

  pool.query(
    "SELECT assigned_by FROM " +
      table_name +
      " WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }

      if (!results.length) {
        return res.status(409).json({
          message: "No Previous Assigne, You can Close the REport!",
        });
      }

      const assigned_by = results[0]?.assigned_by;

      pool.query(
        "UPDATE petition_info SET\
           active_place = '" +
          assigned_by +
          "'\
        WHERE petition_id = '" +
          petition_id +
          "';",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }
          return res.status(201).json({
            message: "Forwarded Successfully",
          });
        }
      );
    }
  );
};

const returnreport = (req, res, next) => {
  const { petition_id, close_report, active_place, rank } = req.body;
  let table_name;

  switch (rank) {
    case "2":
      pool.query(
        "SELECT sub_dept FROM petition_subdept WHERE petition_id = '" +
          petition_id +
          "'",
        (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return res.status(409).send(`Could not Fetch Previous assignee.`);
            return handleSQLError(res, err);
          }

          const assigned_to = results[0]?.sub_dept;

          pool.query(
            "UPDATE petition_subdept SET remarks = '" +
              close_report +
              "'WHERE petition_id ='" +
              petition_id +
              "'",
            (err, results) => {
              if (err) {
                if (err.code === "ER_DUP_ENTRY")
                  return res
                    .status(409)
                    .send(`Could not Update Remarks. Try Again!`);
                return handleSQLError(res, err);
              }

              pool.query(
                "UPDATE petition_info SET\
               active_place = '" +
                  assigned_to +
                  "'\
            WHERE petition_id = '" +
                  petition_id +
                  "';",
                (err, results) => {
                  if (err) {
                    return handleSQLError(res, err);
                  }
                  return res.status(201).json({
                    message: "Returned Successfully",
                  });
                }
              );
            }
          );
        }
      );
      break;
    case "3":
      //check of circle
      pool.query(
        "SELECT circle_insp FROM petition_circle WHERE petition_id = '" +
          petition_id +
          "'",
        (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return res.status(409).send(`Could not Fetch Previous assignee.`);

            //second check for inspector to SHo
            if (!results.length) {
              pool.query(
                "SELECT user_name FROM petition_username WHERE petition_id = '" +
                  petition_id +
                  "'",
                (err, results) => {
                  if (err) {
                    if (err.code === "ER_DUP_ENTRY")
                      return res
                        .status(409)
                        .send(`Could not Fetch Previous assignee.`);
                    return handleSQLError(res, err);
                  }

                  const assigned_to = results[0]?.user_name;

                  //SHO's Remark update
                  pool.query(
                    "UPDATE petition_username SET remarks = '" +
                      close_report +
                      "'WHERE petition_id ='" +
                      petition_id +
                      "'",
                    (err, results) => {
                      if (err) {
                        if (err.code === "ER_DUP_ENTRY")
                          return res
                            .status(409)
                            .send(`Could not Update Remarks. Try Again!`);
                        return handleSQLError(res, err);
                      }

                      //SHO ACtive place update
                      pool.query(
                        "UPDATE petition_info SET\
                       active_place = '" +
                          assigned_to +
                          "'\
                    WHERE petition_id = '" +
                          petition_id +
                          "';",
                        (err, results) => {
                          if (err) {
                            return handleSQLError(res, err);
                          }
                          return res.status(201).json({
                            message: "Returned Successfully",
                          });
                        }
                      );
                    }
                  );
                }
              );
            }
            return handleSQLError(res, err);
          }

          const assigned_to = results[0]?.circle_insp;

          // IF circle is identified update CIRCLE's REMARKS!
          pool.query(
            "UPDATE petition_circle SET remarks = '" +
              close_report +
              "'WHERE petition_id ='" +
              petition_id +
              "'",
            (err, results) => {
              if (err) {
                if (err.code === "ER_DUP_ENTRY")
                  return res
                    .status(409)
                    .send(`Could not Update Remarks. Try Again!`);
                return handleSQLError(res, err);
              }
              //  SET ACTIVE PLACE FOR CIRCLE!
              pool.query(
                "UPDATE petition_info SET\
               active_place = '" +
                  assigned_to +
                  "'\
            WHERE petition_id = '" +
                  petition_id +
                  "';",
                (err, results) => {
                  if (err) {
                    return handleSQLError(res, err);
                  }
                  return res.status(201).json({
                    message: "Returned Successfully",
                  });
                }
              );
            }
          );
        }
      );
      break;
    case "4":
      pool.query(
        "SELECT user_name FROM petition_username WHERE petition_id = '" +
          petition_id +
          "'",
        (err, results) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return res.status(409).send(`Could not Fetch Previous assignee.`);
            return handleSQLError(res, err);
          }

          const assigned_to = results[0]?.user_name;

          pool.query(
            "UPDATE petition_username SET remarks = '" +
              close_report +
              "'WHERE petition_id ='" +
              petition_id +
              "'",
            (err, results) => {
              if (err) {
                if (err.code === "ER_DUP_ENTRY")
                  return res
                    .status(409)
                    .send(`Could not Update Remarks. Try Again!`);
                return handleSQLError(res, err);
              }

              pool.query(
                "UPDATE petition_info SET\
               active_place = '" +
                  assigned_to +
                  "'\
            WHERE petition_id = '" +
                  petition_id +
                  "';",
                (err, results) => {
                  if (err) {
                    return handleSQLError(res, err);
                  }
                  return res.status(201).json({
                    message: "Returned Successfully",
                  });
                }
              );
            }
          );
        }
      );
      break;
    default:
      return res.status(403).json({
        message: "Invalid user",
      });
  }
};

const duplicate = (req, res) => {
  const { rank, user_name, mobile_num, type, category } = req.body;

  pool.query(
    "SELECT petition_id    FROM petition_info    WHERE mobile_num LIKE '" +
      mobile_num +
      "' AND type LIKE '" +
      type +
      "' AND category LIKE '" +
      category +
      "'",

    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res.status(201).json({
          message: "No Duplicates",
          petitions: [],
        });

      return res.status(201).json({
        message: "Duplicates fetched successfully",
        petitions: results,
      });
    }
  );
};

module.exports = {
  addReport,
  fetchReport,
  getReport,
  closeReport,
  acceptreport,
  returnreport,
  duplicate,
};
