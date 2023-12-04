const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const { sendmail } = require("./Sendmail");

const addReport = (req, res, next) => {
  const { petition_id, evidence } = req.body;

  pool.query(
    " INSERT INTO report (petition_id,evidence) VALUES ('" +
      petition_id +
      "', '" +
      evidence +
      "'); ",
    (err, results) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY")
          return res.status(409).send(`Could not Add Report.`);
        return handleSQLError(res, err);
      }

      return res.status(201).json({
        message: "Petition Report Added",
        petition_id: petition_id,
      });
    }
  );
};

const fetchReport = (req, res) => {
  const { rank, user_name } = req.body;

  switch (rank) {
    // DGP fetch all
    case "1":
      pool.query(
        "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '" +
          rank +
          "') IS NOT NULL AND f.petition_id  IN (SELECT petition_id FROM report) AND p.closed =0;",

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
      pool.query(
        "SELECT p.*\
        FROM petition_info p \
        JOIN forwarded_table f ON p.petition_id = f.petition_id \
        WHERE JSON_SEARCH(f.forwards, 'one', '2') IS NOT NULL \
          AND p.petition_id IN (SELECT petition_id FROM report) AND p.petition_id NOT IN\
        (SELECT p.petition_id \
        FROM petition_info p \
        JOIN forwarded_table f ON p.petition_id = f.petition_id \
        WHERE JSON_SEARCH(f.forwards, 'one', '1') IS NOT NULL \
          AND p.petition_id IN (SELECT petition_id FROM report)) AND p.closed =0;",

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

    default:
      return res.status(404).send("Invalid User");
  }
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
  const { petition_id, close_report } = req.body;
  const closed = 1;
  pool.query(
    "UPDATE petition_info\
    SET close_report = '" +
      close_report +
      "',\
        closed = '" +
      closed +
      "'\
    WHERE petition_id = '" +
      petition_id +
      "';",
    (err, results) => {
      if (err) {
        return handleSQLError(res, err);
      }

      pool.query(
        "SELECT mail FROM petition_info\
        WHERE petition_id = '" +
          petition_id +
          "';",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err);
          }

          const mail = results.mail;
          const closemsg = `Your Petition with id[${petition_id}] has been closed.`;

          sendmail({ mail, closemsg });
        }
      );

      return res.status(201).json({
        petition_id: petition_id,
      });
    }
  );
};

module.exports = { addReport, fetchReport, getReport, closeReport };
