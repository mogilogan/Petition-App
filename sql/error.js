const handleSQLError = (res, err) => {
  console.log("SQL Error: ", err);
  return res.status(500).send("Query error at Database occurred...");
};

module.exports = { handleSQLError };
