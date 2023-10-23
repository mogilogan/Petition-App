import React, { useEffect, useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';


import { useDispatch, useSelector } from 'react-redux';

import { statuscheck } from '../../actions/status';
import Table from './Table';

// initial state for petition id
const initialState = {petition_id:null};

const Getcomplain = () => {


  useEffect(() => {
  setErrmsg("");
  },[] )
  
//redux tool
  const dispatch = useDispatch();

  //err msg
  const [errmsg,setErrmsg] = useState("");


  // fetch petition from redux store.
  const { petition } = useSelector((state) => state.status);

   
  // local state
  const [id,setId]=useState(initialState);

  // fetch petition by id
   const fetchPetition = async()=>{
    setErrmsg("");
      const errmsgs = await dispatch(statuscheck(id));
      console.log(errmsgs);
      setErrmsg(errmsgs);
}

  return (
    
    <div  className=' flex flex-col items-center justify-center  '>

      <h1 className='text-3xl text-[#0d193a] py-2 text-center font-libre' >Check Complain Details and Status</h1>
      <Box className='text-center py-2'>
      <input className='formtext' placeholder='Petition id'    type='text' name='petition_id' id="outlined-basic" label="Enter Complain Id" variant="outlined" onChange={(e)=>setId({...id,[e.target.name]: e.target.value})}/>
       <br/>
       <div className="py-4"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"   variant="contained" style={{"zIndex":0}}  onClick={fetchPetition}>Get complain</button></div>
       </Box>
      

      {errmsg === undefined ? 
      <>
      { petition ? 
        <div className='w-full text-center text-5xl py-4 font-serif flex  flex-row items-center justify-center  text-[#0d193a]'>
                
                  {/* Condition for Pending */}
                {petition?.dept === null && <div>
                  <Table petition_id={petition.petition_id} date={petition.time_stamp.slice(0,10)}  status="Pending"/>
                  </div>  
                }
                  {/* Condition for Viwed by SSP */}
                { petition.dept != null &&  petition.sub_dept === null   && <div>
        
                  <Table petition_id={petition.petition_id} date={petition.time_stamp.slice(0,10)}  status="Viewed by SSP"/>
                   </div>  
                }
        
                  {/* Condition for Viewed by SP */}
                {petition.sub_dept != null && petition.user_name === null && <div>
        
                  <Table petition_id={petition.petition_id} date={petition.time_stamp.slice(0,10)}  status="Viewed by SP"/>
                   </div>  
                }
        
                  {/* Condition for Ongoing */}
                {petition.user_name != null && petition.closed === 0  && <div>
        
                  <Table petition_id={petition.petition_id} date={petition.time_stamp.slice(0,10)}  status="Ongoing"/>
                  </div>  
                }
        
                  {/* Condition for Closed */}
                {petition.sub_dept != null && petition.closed === 1 && <div>
                  <Table petition_id={petition.petition_id} date={petition.time_stamp.slice(0,10)}  status="Closed"/>
                  </div>  
                }
        </div>
        : (<div>
          ENTER A VALID PETITION ID
        </div>) }</>
    
    
    : <>
    <p className='text-xl font-serif '>{errmsg}</p>
    </>
    
    }


       
    </div>
    
  )
}

export default Getcomplain