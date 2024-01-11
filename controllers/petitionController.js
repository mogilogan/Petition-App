const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");
const { sendMail } = require("./Sendmail");
const nodemailer = require("nodemailer");
const { sendmail } = require("./Sendmail");

const fetchallnew = (req, res) => {
  const { username, dept_name, sub_dept, rank, user_name, whatnew } = req.body;

  switch (rank) {
    // DGP fetch all
    case "1":
      // pool.query(
      //   "SELECT COUNT(*) FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '" +
      //     user_name +
      //     "') IS NOT NULL AND f.petition_id NOT IN (SELECT petition_id FROM petition_dept UNION SELECT petition_id FROM petition_subdept UNION SELECT petition_id FROM petition_username)",

      //   (err, results) => {
      //     if (err) return handleSQLError(res, err);
      //     if (!results.length) return res.status(404).send(`No new Petitions`);

      //     const count = results.length;
      //     const Limit = 10;

      pool.query(
        "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '" +
          user_name +
          "') IS NOT NULL AND f.petition_id NOT IN (SELECT petition_id FROM petition_dept UNION SELECT petition_id FROM petition_subdept UNION SELECT petition_id FROM petition_username) ORDER BY p.time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err);
          if (!results.length) return res.status(404).send(`No new Petitions`);

          return res.status(201).json({
            message: "Petitions fetched successfully",

            petitions: results,
          });
        }
      );

      break;

    // SSP fetch all
    case "2":
      switch (whatnew) {
        case "newlyassigned":
          console.log("ok");
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
                SELECT petition_id \
                FROM petition_dept \
                WHERE dept = '" +
              user_name +
              "' \
            ) AS combined ON p.petition_id = combined.petition_id \
            LEFT JOIN petition_subdept psd ON p.petition_id = psd.petition_id \
            LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id \
            LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
            WHERE psd.petition_id IS NULL AND u.petition_id IS NULL AND ins.petition_id IS NULL ORDER BY p.time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No new Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "forwarded":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN(SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL)AS combined ON p.petition_id = combined.petition_id ORDER BY p.time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Forwared Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          return res.status(404).send(`Invalid TYpe`);
      }

      break;

    //SP fetch all
    case "3":
      switch (whatnew) {
        case "newlyassigned":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
            SELECT petition_id \
            FROM petition_subdept \
            WHERE sub_dept = '" +
              user_name +
              "' \
        ) AS combined ON p.petition_id = combined.petition_id \
        LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id \
        LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
        WHERE u.petition_id IS NULL AND ins.petition_id IS NULL ORDER BY p.time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No new Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );

          break;
        case "forwarded":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
                SELECT f.petition_id \
                FROM forwarded_table f \
                WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL \
            ) AS combined ON p.petition_id = combined.petition_id \
            LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id \
            LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
            WHERE u.petition_id IS NULL AND ins.petition_id IS NULL ORDER BY p.time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No new Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;

        default:
          break;
      }

      break;

    //Cir Inspec fetch all
    case "4":
      switch (whatnew) {
        case "newlyassigned":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
            SELECT petition_id \
            FROM petition_circle \
            WHERE circle_insp = '" +
              user_name +
              "' \
        ) AS combined ON p.petition_id = combined.petition_id \
        LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
        WHERE u.petition_id IS NULL ORDER BY p.time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No new Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "forwarded":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
            SELECT f.petition_id \
            FROM forwarded_table f \
            WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL \
        ) AS combined ON p.petition_id = combined.petition_id ORDER BY p.time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Forwared Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          break;
      }

      break;

    //SHO's fetch all
    case "5":
      switch (whatnew) {
        case "newlyassigned":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
              SELECT petition_id \
              FROM petition_username \
              WHERE user_name = '" +
              user_name +
              "' \
          ) AS combined ON p.petition_id = combined.petition_id  AND p.petition_id NOT IN (SELECT petition_id from report); ORDER BY p.time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No new Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "forwarded":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN ( \
              SELECT f.petition_id \
              FROM forwarded_table f \
              WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL \
          ) AS combined ON p.petition_id = combined.petition_id ORDER BY p.time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Forwared Petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          break;
      }

      break;

    default:
      return res.status(404).send("Invalid User");
  }
};

const fetchallongoing = (req, res) => {
  const { dept_name, sub_dept, rank, user_name, whatsongoing } = req.body;

  switch (rank) {
    // DGP fetch all
    case "1":
      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '0' ORDER BY time_stamp DESC",
        (err, results) => {
          if (err) return handleSQLError(res, err);
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your DGP's petitions`);

          return res.status(201).json({
            message: "Petitions fetched successfully",
            petitions: results,
          });
        }
      );

      break;

    // SSP fetch all
    case "2":
      switch (whatsongoing) {
        case "active":
          pool.query(
            "SELECT petition_info.* \
            FROM petition_info\
            WHERE petition_info.petition_id IN (SELECT petition_id FROM petition_subdept) \
            AND petition_info.petition_id IN (\
            SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL)\
            AND petition_info.closed = '0' ORDER BY time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SSP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "newremarks":
          pool.query(
            "SELECT petition_info.* \
        FROM petition_info\
        WHERE petition_info.petition_id IN (SELECT petition_id FROM petition_subdept) \
        AND petition_info.petition_id IN (\
        SELECT petition_id  FROM petition_dept  WHERE dept = '" +
              dept_name +
              "' )\
        AND petition_info.closed = '0' ORDER BY time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SSP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          break;
      }
      break;

    //SP fetch all
    case "3":
      switch (whatsongoing) {
        case "active":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND petition_info.petition_id IN (\
            SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL\
         ) AND petition_info.closed = '0' ORDER BY time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "newremarks":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) \
          AND  petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '" +
              sub_dept +
              "') AND petition_info.closed = '0' ORDER BY time_stamp DESC",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SSP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          break;
      }
      break;

    //Cir Inspec fetch all
    case "4":
      switch (whatsongoing) {
        case "active":
          pool.query(
            "SELECT *\
            FROM petition_info\
            WHERE petition_id IN (SELECT petition_id FROM petition_username)\
            AND petition_id IN ( SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
              user_name +
              "') IS NOT NULL )\
            AND closed = '0' ORDER BY time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "newremarks":
          pool.query(
            "SELECT *\
        FROM petition_info\
        WHERE petition_id IN (SELECT petition_id FROM petition_username)\
        AND petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp ='" +
              user_name +
              "' )\
        AND closed = '0' ORDER BY time_stamp DESC;",

            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res.status(404).send(`No Petitions exists for your SSP`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        default:
          break;
      }
      break;

    case "5":
      pool.query(
        "SELECT p.* FROM petition_info p JOIN ( \
          SELECT petition_id \
          FROM petition_username \
          WHERE user_name = '" +
          user_name +
          "') AS combined ON p.petition_id = combined.petition_id  AND p.closed = '0' ORDER BY time_stamp DESC;",

        (err, results) => {
          if (err) return handleSQLError(res, err);
          if (!results.length)
            return res.status(404).send(`No Petitions exists for your SHO`);

          return res.status(201).json({
            message: "Petitions fetched successfully",
            petitions: results,
          });
        }
      );
      break;

    default:
      return res.status(404).send("Invalid User");
  }
};

const fetchallonclosed = (req, res) => {
  const { dept_name, sub_dept, rank, user_name, whatclosed } = req.body;

  switch (rank) {
    // DGP fetch all

    case "1":
      switch (whatclosed) {
        case "byme":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '1'\
          AND petition_info.closed_by = '" +
              user_name +
              "' ORDER BY time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "byothers":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_dept WHERE petition_info.closed_by = '" +
              user_name +
              "') AND petition_info.closed = '1'\
           ORDER BY time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;

        default:
          break;
      }

      break;

    // SSP fetch all
    case "2":
      console.log("ok");
      switch (whatclosed) {
        case "byme":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_subdept) AND petition_info.closed = '1'\
            AND petition_info.closed_by = '" +
              user_name +
              "' ORDER BY time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              console.log(results);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "byothers":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_dept WHERE dept = '" +
              user_name +
              "') \
            AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
            (SELECT petition_id FROM petition_subdept WHERE p.closed_by = '" +
              user_name +
              "') AND p.closed = '1'\
            ORDER BY p.time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;

        default:
          break;
      }
      break;

    //SP fetch all
    case "3":
      switch (whatclosed) {
        case "byme":
          pool.query(
            "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND petition_info.closed = '1'\
            AND petition_info.closed_by = '" +
              user_name +
              "' ORDER BY time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;
        case "byothers":
          pool.query(
            "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_subdept WHERE sub_dept = '" +
              user_name +
              "') \
            AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
            (SELECT petition_id FROM petition_circle WHERE p.closed_by = '" +
              user_name +
              "') AND p.closed = '1'\
            ORDER BY p.time_stamp DESC",
            (err, results) => {
              if (err) return handleSQLError(res, err);
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your DGP's petitions`);

              return res.status(201).json({
                message: "Petitions fetched successfully",
                petitions: results,
              });
            }
          );
          break;

        default:
          break;
      }

      break;

    //Cir Inspec fetch all
    case "4":
      pool.query(
        "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_circle WHERE circle_insp = '" +
          user_name +
          "') \
        AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
        (SELECT petition_id FROM petition_username WHERE p.closed_by = '" +
          user_name +
          "') AND p.closed = '1'\
        ORDER BY p.time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err);
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your Circle Inspector`);

          return res.status(201).json({
            message: "Petitions fetched successfully",
            petitions: results,
          });
        }
      );

      break;

    case "5":
      pool.query(
        "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_username WHERE user_name = '" +
          user_name +
          "') \
        AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
        (SELECT petition_id FROM petition_username WHERE p.closed_by = '" +
          user_name +
          "') AND p.closed = '1'\
        ORDER BY p.time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err);
          if (!results.length)
            return res.status(404).send(`No Petitions exists for your SHO`);

          return res.status(201).json({
            message: "Petitions fetched successfully",
            petitions: results,
          });
        }
      );

      break;

    default:
      return res.status(404).send("Invalid User");
  }
};

const addPetition = async (req, res, next) => {
  const {
    type,
    description,
    end_date,
    mail,
    p_name,
    mobile_num,
    address,
    submitted_by,
    forwarded,
    image,
    category,
    code,
  } = req.body;
  console.log(submitted_by);
  pool.query(
    " INSERT INTO petition_info (type,category,description,end_date,p_name,mail,mobile_num,address,submitted_by,image) VALUES ('" +
      type +
      "', '" +
      category +
      "', '" +
      description +
      "', '" +
      end_date +
      "', '" +
      p_name +
      "', '" +
      mail +
      "', '" +
      mobile_num +
      "', '" +
      address +
      "', '" +
      submitted_by +
      "', '" +
      image +
      "'); ",
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).send(`Could not Add Petition.`);
        return handleSQLError(res, err);
      }

      //generate akn_num
      const petition_id = results.insertId;
      const d = new Date();
      let year = d.getFullYear();
      const akn_num = year.toString() + "/" + code + "/" + petition_id;

      //update akn_num in same id
      pool.query(
        "UPDATE petition_info SET akn_num = CONCAT('" +
          year +
          "','/','" +
          code +
          "','/',petition_id) WHERE petition_id='" +
          petition_id +
          "';",
        (err, cresults) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return res.status(409).send(`Could not Add forwared`);
            return handleSQLError(res, err);
          }
        }
      );

      //send mail
      sendmail({ mail, petition_id, p_name, akn_num });

      // forwared table insert
      pool.query(
        " INSERT INTO forwarded_table (petition_id,forwards) VALUES ('" +
          results.insertId +
          "', '" +
          forwarded +
          "'); ",
        (err, fresults) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY")
              return res.status(409).send(`Could not Add forwared`);
            return handleSQLError(res, err);
          }
        }
      );

      return res.status(201).json({
        message: "Petition Successfully Created",
        complain_details: { complain_id: results.insertId },
      });
    }
  );
};

const assignssp = (req, res, next) => {
  const { petition_id, dept_name, remarks, assigned_by } = req.body;

  pool.query(
    "UPDATE petition_info SET active_place = '" +
      dept_name +
      "' WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      pool.query(
        "INSERT INTO petition_dept (petition_id,dept,remarks,assigned_by) VALUES ('" +
          petition_id +
          "', '" +
          dept_name +
          "', '" +
          remarks +
          "', '" +
          assigned_by +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }
          return res.status(201).json({
            petition_id: petition_id,
          });
        }
      );
    }
  );
};

const assignsp = (req, res, next) => {
  const { sub_dept, petition_id, remarks, assigned_by } = req.body;

  pool.query(
    "UPDATE petition_info SET active_place = '" +
      sub_dept +
      "' WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      pool.query(
        "INSERT INTO petition_subdept (petition_id,sub_dept,remarks,assigned_by) VALUES ('" +
          petition_id +
          "', '" +
          sub_dept +
          "', '" +
          remarks +
          "', '" +
          assigned_by +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }
          return res.status(201).json({
            petition_id: petition_id,
          });
        }
      );
    }
  );
};

const assigncp = (req, res, next) => {
  const { circle_insp, petition_id, remarks, assigned_by } = req.body;
  pool.query(
    "UPDATE petition_info SET active_place = '" +
      circle_insp +
      "' WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      pool.query(
        "INSERT INTO petition_circle (petition_id,circle_insp,remarks,assigned_by) VALUES ('" +
          petition_id +
          "', '" +
          circle_insp +
          "', '" +
          remarks +
          "', '" +
          assigned_by +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }
          return res.status(201).json({
            petition_id: petition_id,
          });
        }
      );
    }
  );
};

const assignsho = (req, res, next) => {
  const { user_name, petition_id, remarks, assigned_by } = req.body;
  console.log(assigned_by);
  pool.query(
    "UPDATE petition_info SET active_place = '" +
      user_name +
      "' WHERE petition_id = '" +
      petition_id +
      "'",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      pool.query(
        "INSERT INTO petition_username (petition_id,user_name,remarks,assigned_by) VALUES ('" +
          petition_id +
          "', '" +
          user_name +
          "', '" +
          remarks +
          "', '" +
          assigned_by +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }
          return res.status(201).json({
            petition_id: petition_id,
          });
        }
      );
    }
  );
};

const markview = (req, res, next) => {
  const { user_name, petition_id } = req.body;
  pool.query(
    "UPDATE forwarded_table SET forwards = JSON_SET(forwards, CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(forwards, 'one', '" +
      user_name +
      "')),'].seen'),'true') WHERE petition_id = '" +
      petition_id +
      "' AND JSON_SEARCH(forwards, 'one', '" +
      user_name +
      "') IS NOT NULL;",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }
      return res.status(201).json({
        message: `${petition_id} marked as Viewed`,
      });
    }
  );
};

module.exports = {
  addPetition,
  fetchallnew,
  fetchallongoing,
  fetchallonclosed,
  assigncp,
  assignssp,
  assignsho,
  assignsp,
  markview,
};
