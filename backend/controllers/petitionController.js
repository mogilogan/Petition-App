
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')







const fetchallnew = (req, res) => {

  const {dept_name,sub_dept,rank,cir_inspec,username } = req.body


  switch (rank) {

    // DGP fetch all
    case 1:
      pool.query(
        "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_dept) ORDER BY time_stamp DESC",

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
    case 2:
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_subdept) AND  petition_id IN (SELECT petition_id FROM petition_dept WHERE petition_dept.dept = '" + dept_name + "') ORDER BY time_stamp DESC ",

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
      case 3:
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_circle) AND  petition_id IN (SELECT petition_id FROM petition_subdept WHERE petition_subdept.sub_dept = '" + sub_dept + "') ORDER BY time_stamp DESC",

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
      case 4:

      pool.query(
        "SELECT * FROM petition_info WHERE petition_id NOT IN (SELECT petition_id FROM petition_username) AND  petition_id IN (SELECT petition_id FROM petition_circle WHERE petition_circle.circle_insp = '" + username + "') ORDER BY time_stamp DESC",

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

      //SHO's fetch all
      case 5:
      pool.query(
        "SELECT * FROM petition_info JOIN petition_username ON petition_info.petition_id = petition_username.petition_id WHERE petition_username.user_name='" + username + "' ORDER BY time_stamp DESC",

        (err, results) => {
          if (err) return handleSQLError(res, err)
          if (!results.length)
            return res
              .status(404)
              .send(`No Petitions exists for your SHO's `)
          console.log(results);

          return res.status(201).json({
              message: 'Petitions fetched successfully',
              petitions: results,
            })
        }
      )

      break;
  
    default:
      break;
  }

}





const fetchallongoing = (req, res) => {

  const {dept_name,sub_dept,rank,cir_inspec,username } = req.body

  switch (rank) {

    // DGP fetch all
    case 1:
      pool.query(
        "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_dept) AND petition_info.closed = '0' ORDER BY time_stamp DESC",
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
    case 2:
        pool.query(
          "SELECT * FROM petition_info WHERE petition_id IN (SELECT petition_id FROM petition_subdept) AND  petition_id IN (SELECT petition_id FROM petition_dept WHERE petition_dept.dept = '" + dept_name + "') AND petition_info.closed = '0' ORDER BY time_stamp DESC",

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
      case 3:
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
      case 4:

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
      break;
  }

}





const fetchallonclosed = (req, res) => {

  const {dept_name,sub_dept,rank,cir_inspec,username } = req.body

  switch (rank) {

    // DGP fetch all
    case 1:
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
    case 2:
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
      case 3:
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
      case 4:

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

      case 5:

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
      break;
  }

}



const addPetition = (req, res, next) => {
    const { title,description,end_date} = req.body
      pool.query(
        "INSERT INTO petition_info (title,description,end_date) VALUES ('" +
          title +
          "', '" +
          description +
          "', '" +
          end_date +
          "')",
        (err, results) => {
          if (err) {
            if (err.code === 'ER_DUP_ENTRY')
              return res.status(409).send(`Could not Add Petition.`)
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'Petition Successfully Created',
            complain_details: { title:title , complain_id: results.complain_id }
          })
        }
      )
  }



  const assignssp = (req, res, next) => {
    const { dept_name,petition_id } = req.body
      pool.query(
        "INSERT INTO petition WHERE petition_id = '" + petition_id + "' (dept_name)  VALUES ('" +
          dept_name +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'SSP Successfully Assigned',
          })
        }
      )
  }

  const assignsp = (req, res, next) => {
    const { sub_dept,petition_id } = req.body
      pool.query(
        "INSERT INTO petition WHERE petition_id = '" + petition_id + "' (sub_dept)  VALUES ('" +
          sub_dept +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'SP Successfully Assigned',
          })
        }
      )
  }


  const assigncp = (req, res, next) => {
    const { cir_inspec,petition_id } = req.body
      pool.query(
        "INSERT INTO petition WHERE petition_id = '" + petition_id + "' (cir_inspec)  VALUES ('" +
          cir_inspec +
          "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'CP Successfully Assigned',
          })
        }
      )
  }


  const assignsho = (req, res, next) => {
    const { username,petition_id } = req.body
      pool.query(
        "INSERT INTO petition WHERE petition_id = '" + petition_id + "' (username)  VALUES ('" +
        username +
        "')",
        (err, results) => {
          if (err) {
            return handleSQLError(res, err)
          }
          return res.status(201).json({
            message: 'username Successfully Assigned',
          })
        }
      )
  }








  module.exports = { addPetition,fetchallnew, fetchallongoing,fetchallonclosed,assigncp,assignssp,assignsho,assignsp }