
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')



const countongoing = (req, res) => {

    console.log("ok");
    const {dept_name,sub_dept,rank,cir_inspec,username } = req.body
  
    switch (rank) {
  
      // DGP fetch all
      case "1":
        pool.query(
          "SELECT COUNT(*) as total_rows, SUM(CASE WHEN petition_info.closed = '1' THEN 1 ELSE 0 END) as closed, SUM(CASE WHEN petition_info.closed = '0' AND petition_id IN (SELECT petition_id FROM petition_dept) THEN 1 ELSE 0 END) as ongoing, COUNT(CASE WHEN petition_info.closed = '0'AND petition_id NOT IN (SELECT petition_id FROM petition_dept) THEN 1 ELSE NULL END) as new FROM petition_info ",
          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your DGP's petitions`)
            console.log(results);
            return res.status(201).json(
                
               results[0],
            )
          }
        )
  
        break;
  
      // SSP fetch all
      case "2":
        
          pool.query(
            "SELECT COUNT(*) as total_rows, SUM(CASE WHEN closed = '1' THEN 1 ELSE 0 END) as closed, SUM(CASE WHEN closed = '0' AND petition_id IN (SELECT petition_id FROM petition_subdept) THEN 1 ELSE 0 END) as ongoing, COUNT(CASE WHEN closed = '0' AND petition_id NOT IN (SELECT petition_id FROM petition_subdept) THEN 1 ELSE NULL END) as new FROM ( SELECT petition_id, closed FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept WHERE petition_dept.dept = '" + dept_name + "')) AS filtered_petitions ;",
  
            (err, results) => {
              if (err) return handleSQLError(res, err)
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your SSP`)
              console.log(results);
      
              return res.status(201).json({
                  
                  results,
                })
            }
          )
        break;
  
       //SP fetch all
        case "3":
          pool.query(
            "SELECT COUNT(*) as total_rows, SUM(CASE WHEN closed = '1' THEN 1 ELSE 0 END) as closed, SUM(CASE WHEN closed = '0' AND petition_id IN (SELECT petition_id FROM petition_circle) THEN 1 ELSE 0 END) as ongoing, COUNT(CASE WHEN closed = '0' AND petition_id NOT IN (SELECT petition_id FROM petition_circle) THEN 1 ELSE NULL END) as new FROM (SELECT petition_id, closed FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '"+sub_dept+"')) AS filtered_petitions ; ",
  
            (err, results) => {
  
              if (err) return handleSQLError(res, err)
              if (!results.length)
                return res
                  .status(404)
                  .send(`No Petitions exists for your SP`)
              console.log(results);
      
              return res.status(201).json({
                  
                  results,
                })
            }
          )
        break;
  
  
        //Cir Inspec fetch all
        case "4":
  
        pool.query(
          "SELECT SUM(CASE WHEN petition_info.closed = '0' THEN 1 ELSE 0 END) as ongoing, SUM(CASE WHEN petition_info.closed = '1' THEN 1 ELSE 0 END) as closed FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username) AND  petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp = '" + username + "') AND petition_info.closed = '0' ",
  
          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your Circle Inspector`)
            console.log(results);
    
            return res.status(201).json({
                
               results,
              })
          }
        )
  
        break;
  
    
      default:
        return res
                  .status(404)
                  .send("Invalid User");
    }
  
  }


  module.exports = { countongoing};