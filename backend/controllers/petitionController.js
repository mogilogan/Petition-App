
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')







const fetchallnew = (req, res) => {


  const {username,dept_name,sub_dept,rank,user_name } = req.body


  switch (rank) {

    // DGP fetch all
    case "1":
    
      pool.query(
        "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '"+user_name+"') IS NOT NULL AND f.petition_id NOT IN (SELECT petition_id FROM petition_dept UNION SELECT petition_id FROM petition_subdept UNION SELECT petition_id FROM petition_username);",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No new Petitions`)
         
    
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })

            
        
        }
      )

      break;

    // SSP fetch all
    case "2":
      console.log(user_name);
        pool.query(
          "SELECT p.* FROM petition_info p JOIN ( \
              SELECT petition_id \
              FROM petition_dept \
              WHERE dept = '"+ user_name+"' \
              UNION \
              SELECT f.petition_id \
              FROM forwarded_table f \
              WHERE JSON_SEARCH(f.forwards, 'one', '"+ user_name+"') IS NOT NULL \
          ) AS combined ON p.petition_id = combined.petition_id \
          LEFT JOIN petition_subdept psd ON p.petition_id = psd.petition_id \
          LEFT JOIN petition_username u ON p.petition_id = u.petition_id \
          WHERE psd.petition_id IS NULL AND u.petition_id IS NULL;",

          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No new Petitions`)
          
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;

     //SP fetch all
      case "3":
        pool.query(
          "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '"+user_name+"') IS NOT NULL AND f.petition_id IN (SELECT petition_id FROM petition_subdept ) AND f.petition_id NOT IN (SELECT petition_id FROM petition_username);",

          (err, results) => {

            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No new Petitions`)
            console.log(results);
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;

      //Cir Inspec fetch all
      case "4":

      pool.query(
        "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_username) AND  petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp = '" + username + "') ORDER BY time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No new Petitions`)
          console.log(results);
  
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })
        }
      )

      break;

      //SHO's fetch all
      case "5":
      pool.query(
        "SELECT p.*FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE JSON_SEARCH(f.forwards, 'one', '" + user_name + "') IS NOT NULL AND f.petition_id  IN (SELECT petition_id FROM petition_username);",
 
        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No new Petitions`)
          console.log(results);

          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
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





const fetchallongoing = (req, res) => {

  const {dept_name,sub_dept,rank,cir_inspec,username } = req.body

  switch (rank) {
    
    // DGP fetch all
    case "1":
      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '0' ORDER BY time_stamp DESC",
        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your DGP's petitions`)
        
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })
        }
      )

      break;

    // SSP fetch all
    case "2":
     
        pool.query(
          "SELECT petition_info.* \
          FROM petition_info\
          WHERE petition_info.petition_id IN (SELECT petition_id FROM petition_subdept) \
          AND petition_info.petition_id IN (\
              SELECT petition_id  FROM petition_dept  WHERE dept = '"+dept_name+"' AND assigned_time IS NOT NULL \
              UNION \
              SELECT f.petition_id FROM forwarded_table f WHERE JSON_SEARCH(f.forwards, 'one', '"+dept_name+"') IS NOT NULL)\
          AND petition_info.closed = '0' ORDER BY (\
              SELECT assigned_time FROM petition_subdept WHERE petition_subdept.petition_id = petition_info.petition_id ) DESC;",

          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your SSP`)
           
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;

     //SP fetch all
      case "3":
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND  petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '" + sub_dept + "') AND petition_info.closed = '0' ORDER BY time_stamp DESC",

          (err, results) => {

            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your SP`)
            console.log(results);
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;

      //Cir Inspec fetch all
      case "4":

      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username) AND  petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp = '" + username + "') AND petition_info.closed = '0' ORDER BY time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your Circle Inspector`)
          console.log(results);
  
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
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


const fetchallonclosed = (req, res) => {

  const {dept_name,sub_dept,rank,cir_inspec,username } = req.body

  switch (rank) {

    // DGP fetch all
    case "1":
      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '1' ORDER BY time_stamp DESC",
        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your DGP's petitions`)
          console.log(results);
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })
        }
      )

      break;

    // SSP fetch all
    case "2":
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_subdept) AND  petition_id IN (SELECT petition_id FROM petition_dept WHERE petition_dept.dept = '" + dept_name + "') AND petition_info.closed = '1' ORDER BY time_stamp DESC",

          (err, results) => {
            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your SSP`)
            console.log(results);
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;

     //SP fetch all
      case "3":
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_circle) AND  petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '" + sub_dept + "') AND petition_info.closed = '1' ORDER BY time_stamp DESC",

          (err, results) => {

            if (err) return handleSQLError(res, err)
            if (!results.length)
              return res
                .status(404)
                .send(`No Petitions exists for your SP`)
            console.log(results);
    
            return res.status(201).json({
                message: 'Petitions fetched successfully',
                petitions: results,
              })
          }
        )
      break;


      //Cir Inspec fetch all
      case "4":

      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username) AND  petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp = '" + username + "') AND petition_info.closed = '1' ORDER BY time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your Circle Inspector`)
          console.log(results);
  
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })
        }
      )

      break;

      case "5":

      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_username WHERE petition_username.user_name = '" + username + "') AND petition_info.closed = '1' ORDER BY time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your Circle Inspector`)
          console.log(results);
  
          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
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



const addPetition = (req, res, next) => {
    const { title,description,end_date,p_name,mobile_num,address,submitted_by,forwarded} = req.body


      pool.query(
        " INSERT INTO petition_info (title,description,end_date,p_name,mobile_num,address,submitted_by) VALUES ('" +
          title +
          "', '" +
          description +
          "', '" +
          end_date +
          "', '" +
          p_name +
          "', '" +
          mobile_num +
          "', '" +
          address +
          "', '" +
          submitted_by +
          "'); ",
        (err, results) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY')
              return res.status(409).send(`Could not Add Petition.`)
            return handleSQLError(res, err)
          }
          console.log(results);

          // forwared table insert
          pool.query(
            " INSERT INTO forwarded_table (petition_id,forwards) VALUES ('" +
              results.insertId +
              "', '" +
              forwarded +
              "'); ",
            (err, fresults) => {
              if (err) {
                if (err.code === 'ER_DUP_ENTRY')
                  return res.status(409).send(`Could not Add forwared`)
                return handleSQLError(res, err)
              }
              console.log(fresults);
            }
          );

          return res.status(201).json({
           
            message: 'Petition Successfully Created',
            complain_details: { title:title , complain_id: results.insertId }
          })
        }
      )


  }



  const assignssp = (req, res, next) => {
    const { petition_id,dept_name,remarks } = req.body
    console.log(petition_id);
      pool.query(
        "INSERT INTO petition_dept (petition_id,dept,remarks) VALUES ('" +
        petition_id +
        "', '" +
        dept_name  +
        "', '" +
        remarks  +
        "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            petition_id: petition_id,
          })
        }
      )
  }


  // const forwardfetch = (req, res, next) => {

  //   // const { user_name } = req.body
  //   const user_name = "DGP"
  //   console.log(req);
  
  //     pool.query(
  //       "SELECT p.* FROM petition_info p JOIN forwarded_table f ON p.petition_id = f.petition_id WHERE  JSON_SEARCH(forwards, 'one', '" + user_name + "') IS NOT NULL;",
  //       (err, results) => {
  //         if (err) {
  //           return handleSQLError(res, err)
  //         }
  //         console.log(results);
  //         return res.status(201).json({
  //           message: 'Petitions fetched successfully',
  //           petitions: results
  //         })
  //       }
  //     )
  // }

  const assignsp = (req, res, next) => {
    const { sub_dept,petition_id,remarks } = req.body
      pool.query(
        "INSERT INTO petition_subdept (petition_id,sub_dept,remarks) VALUES ('" +
        petition_id +
        "', '" +
        sub_dept  +
        "', '" +
        remarks  +
        "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            petition_id: petition_id,
          })
        }
      )
  }


  const assigncp = (req, res, next) => {
    const { circle_insp,petition_id } = req.body
      pool.query(
        "INSERT INTO petition_circle (petition_id,circle_insp) VALUES ('" +
        petition_id +
        "', '" +
        circle_insp  +
        "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            petition_id: petition_id,
          })
        }
      )
  }


  const assignsho = (req, res, next) => {
    const { username,petition_id } = req.body
      pool.query(
        "INSERT INTO petition_username (petition_id,user_name) VALUES ('" +
        petition_id +
        "', '" +
        username  +
        "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            petition_id: petition_id,
          })
        }
      )
  }

  const markview = (req, res, next) => {
    const { user_name,petition_id } = req.body
      pool.query(
        "UPDATE forwarded_table SET forwards = JSON_SET(forwards, CONCAT('$[', JSON_UNQUOTE(JSON_SEARCH(forwards, 'one', '"+user_name+"')),'].seen'),'true') WHERE petition_id = '"+petition_id+"' AND JSON_SEARCH(forwards, 'one', '"+user_name+"') IS NOT NULL;",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message:`${petition_id} marked as Viewed`
          })
        }
      )
  }


  module.exports = { addPetition,fetchallnew, fetchallongoing,fetchallonclosed,assigncp,assignssp,assignsho,assignsp ,markview}