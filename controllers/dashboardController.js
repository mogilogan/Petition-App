
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')



const countongoing = (req, res) => {

    console.log(req.body);
    const {dept_name,sub_dept,rank,type,username } = req.body
  
    switch (type) {
  
      // DGP fetch all
      case "all":
        pool.query(
          "SELECT * FROM petition_info",
          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your DGP's petitions`)
           
            return res.status(201).json(
                
               results,
            )
          }
        )
  
        break;
  
      // SSP fetch all
      case "ongoing":
        
          pool.query(
            "SELECT petition_info.*,petition_dept.dept FROM petition_info LEFT JOIN petition_dept ON petition_info.petition_id = petition_dept.petition_id WHERE closed= 0",
  
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
        case "closed":
          pool.query(
            "SELECT * FROM petition_info WHERE closed=1",
  
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
        case "closed":
  
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