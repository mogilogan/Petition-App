const pool = require("../sql/connection");
const { handleSQLError } = require("../sql/error");

const countongoing = (req, res) => {
  const { ssp, sp, month, year, closed, pending, rank, user_name } = req.body;

  let newquery;
  let onquery;
  let closedquery;

  console.log(rank);

  if (rank === "5") {
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
  }

  // const main =
  //   "SELECT pi.*, MONTH(pi.time_stamp), YEAR(pi.time_stamp) FROM petition_info pi ";
  // const sspjoin = "JOIN petition_dept pd ON pi.petition_id = pd.petition_id";
  // const spjoin =
  //   "JOIN petition_subdept spd ON pi.petition_id = spd.petition_id";
  // const sspcon = "pd.dept = '" + ssp + "' ";
  // const spcon = "AND spd.sub_dept = '" + sp + "' ";
  // const moncon = "AND MONTH(pi.time_stamp) = '" + month + "' ";
  // const yearcon = "AND YEAR(pi.time_stamp) = '" + year + "'";
  // const clocon = "AND pi.closed = '" + closed + "'";

  // const querys =
  //   main +
  //   (ssp !== null ? sspjoin : "") +
  //   (sp !== null ? spjoin : "") +
  //   " where " +
  //   (ssp !== null ? sspcon : "") +
  //   (sp !== null ? spcon : "") +
  //   (month !== null ? moncon : "") +
  //   (year !== null ? yearcon : "");
  // // )(clocon !== null ? clocon : "");

  // pool.query(
  //   querys,

  //   (err, results) => {
  //     if (err) return handleSQLError(res, err);
  //     if (!results.length)
  //       return res.status(404).send(`No Petitions for the given query`);

  //     return res.status(201).json({
  //       message: "Petitions fetched successfully",
  //       petitions: results,
  //     });
  //   }
  // );
};

module.exports = { countongoing };
