import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';

import { statuscheck } from '../../actions/status';

// initial state for petition id
const initialState = {petition_id:null};


const Getcomplain = () => {

//redux tool
  const dispatch = useDispatch();


  // fetch petition from redux store.
  const { petition } = useSelector((state) => state.status);
   
  // local state
  const [id,setId]=useState(initialState);

  // fetch petition by id
   const fetchPetition =()=>{
    console.log(id);
      dispatch(statuscheck(id));
}

  return (
    
    <div  className=' mx-auto w-full'>

      <h1 className='text-3xl text-teal-500 py-2 text-center' >Check Complain Details and Status</h1>
      <Box className='text-center py-2'>
      <TextField inputProps={{min: 0, style: { textAlign: 'center' }}}  type='number' name='petition_id' id="outlined-basic" label="Enter Complain Id" variant="outlined" onChange={(e)=>setId({...id,[e.target.name]: e.target.value})}/>
       <br/>
       <div className="py-4"><Button  variant="contained" onClick={fetchPetition}>Get complain</Button></div>
       </Box>
       { petition ? 
<div className=' text-center text-5xl py-4 font-mono text-yellow-600'>
        
        <p className='text-black px-4'>Status: </p>
          {/* Condition for Pending */}
        {petition?.dept_id === null && <div>
          <p>Pending</p>
          </div>  
        }
          {/* Condition for Viwed by SSP */}
        { petition.dept_id != null && petition.sub_dept === null && <div>

           <p>View by SSP</p>
           </div>  
        }

          {/* Condition for Viewed by SP */}
        {petition.sub_dept != null && petition.username === null && <div>

           <p>Viewed by SP</p>
           </div>  
        }

          {/* Condition for Ongoing */}
        {petition.username != null && petition.closed === 0  && <div>

           <p>ONGOING</p>
          </div>  
        }

          {/* Condition for Closed */}
        {petition.sub_dept != null && petition.closed === 1 && <div>
          <p>Closed</p>
          </div>  
        }
</div>
: (<div></div>) }
    </div>
    
  )
}

export default Getcomplain