const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const countongoing = (req, res) => {
  const { ssp, sp, month, year, closed, pending, rank, user_name } = req.body;

  let newquery;
  let onquery;
  let closedquery;

  console.log(rank);

  switch (rank) {
    case "1":
      newquery =
        "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL AND f.petition_id NOT IN (SELECT petition_id FROM petition_dept UNION SELECT petition_id FROM petition_subdept UNION SELECT petition_id FROM petition_username);";
      onquery =
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '0';";
      closedquery =
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '1'\
      AND petition_info.closed_by = '" +
        user_name +
        "' UNION SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_dept WHERE petition_info.closed_by = '" +
        user_name +
        "') AND petition_info.closed = '1';";

      break;
    case "2":
      newquery =
        "SELECT p.* FROM petition_info p JOIN (SELECT petition_id FROM petition_dept WHERE dept = '" +
        user_name +
        "' \
      ) AS combined ON p.petition_id = combined.petition_id  LEFT JOIN petition_subdept psd ON p.petition_id = psd.petition_id \
      LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
      WHERE psd.petition_id IS NULL AND u.petition_id IS NULL AND ins.petition_id IS NULL UNION SELECT p.* FROM petition_info p JOIN(SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL)AS combined ON p.petition_id = combined.petition_id;";
      onquery =
        "SELECT petition_info.* \
        FROM petition_info\
        WHERE petition_info.petition_id IN (SELECT petition_id FROM petition_subdept) \
        AND petition_info.petition_id IN (\
        SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL)\
        AND petition_info.closed = '0' UNION SELECT petition_info.* \
        FROM petition_info\
        WHERE petition_info.petition_id IN (SELECT petition_id FROM petition_subdept) \
        AND petition_info.petition_id IN (\
        SELECT petition_id  FROM petition_dept  WHERE dept = '" +
        user_name +
        "' )\
        AND petition_info.closed = '0';";

      closedquery =
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_subdept) AND petition_info.closed = '1'\
        AND petition_info.closed_by = '" +
        user_name +
        "' UNION SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_dept WHERE dept = '" +
        user_name +
        "') \
        AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
        (SELECT petition_id FROM petition_subdept WHERE p.closed_by = '" +
        user_name +
        "') AND p.closed = '1';";

      break;
    case "3":
      newquery =
        "SELECT p.* FROM petition_info p JOIN ( \
          SELECT petition_id \
          FROM petition_subdept \
          WHERE sub_dept = '" +
        user_name +
        "' \
      ) AS combined ON p.petition_id = combined.petition_id \
      LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id \
      LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
      WHERE u.petition_id IS NULL AND ins.petition_id IS NULL UNION SELECT p.* FROM petition_info p JOIN ( \
        SELECT f.petition_id \
        FROM forwarded_table f \
        WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL \
    ) AS combined ON p.petition_id = combined.petition_id \
    LEFT JOIN petition_circle ins ON p.petition_id = ins.petition_id \
    LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
    WHERE u.petition_id IS NULL AND ins.petition_id IS NULL;";

      onquery =
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND petition_info.petition_id IN (\
      SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL\
   ) AND petition_info.closed = '0' UNION SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) \
   AND  petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '" +
        user_name +
        "') AND petition_info.closed = '0';";
      closedquery =
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND petition_info.closed = '1'\
       AND petition_info.closed_by = '" +
        user_name +
        "' UNION SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_subdept WHERE sub_dept = '" +
        user_name +
        "') AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
       (SELECT petition_id FROM petition_circle WHERE p.closed_by = '" +
        user_name +
        "') AND p.closed = '1';";

      break;
    case "4":
      newquery =
        "SELECT p.* FROM petition_info p JOIN ( SELECT petition_id FROM petition_circle WHERE circle_insp = '" +
        user_name +
        "') AS combined ON p.petition_id = combined.petition_id LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
              WHERE u.petition_id IS NULL UNION SELECT p.* FROM petition_info p JOIN ( \
                  SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL) AS combined ON p.petition_id = combined.petition_id;";
      onquery =
        "SELECT *FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username)\
        AND petition_id IN ( SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '" +
        user_name +
        "') IS NOT NULL)AND closed = '0' UNION SELECT *FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username)\
        AND petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp ='" +
        user_name +
        "' ) AND closed = '0';";
      closedquery =
        "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_circle WHERE circle_insp = '" +
        user_name +
        "')  AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
      (SELECT petition_id FROM petition_username WHERE p.closed_by = '" +
        user_name +
        "') AND p.closed = '1' ORDER BY p.time_stamp DESC;";
      break;
    case "5":
      newquery =
        "SELECT p.* FROM petition_info p JOIN (SELECT petition_id FROM petition_username WHERE user_name = '" +
        user_name +
        "'\
        ) AS combined ON p.petition_id = combined.petition_id AND p.petition_id NOT IN (SELECT petition_id FROM report) UNION \
        SELECT pp.* FROM petition_info pp JOIN ( SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', 'SHO_LAWSPET') IS NOT NULL) AS combined \
        ON pp.petition_id = combined.petition_id;";

      onquery =
        "SELECT p.* FROM petition_info p JOIN (\
      SELECT petition_id FROM petition_username WHERE user_name =  '" +
        user_name +
        "') AS combined \
  ON p.petition_id = combined.petition_id AND p.closed = '0';";
      closedquery =
        "SELECT p.* FROM petition_info p JOIN(SELECT petition_id from petition_username WHERE user_name = '" +
        user_name +
        "') \
AS combined ON p.petition_id = combined.petition_id WHERE p.petition_id NOT IN \
(SELECT petition_id FROM petition_username WHERE p.closed_by = '" +
        user_name +
        "') AND p.closed = '1';";
      break;

    default:
      return res.status(404).send("Invalid user");
  }

  pool.query(
    newquery + onquery + closedquery,

    (err, results) => {
      if (err) return handleSQLError(res, err);
      if (!results.length)
        return res.status(404).send(`No Petitions for the given query`);

      return res.status(201).json({
        message: "Petitions fetched successfully",
        petitions: results,
      });
    }
  );
};
module.exports = { countongoing };
