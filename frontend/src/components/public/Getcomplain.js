import React, { useState } from 'react'
import axios from 'axios'
import { Button, TextField, Typography } from '@mui/material';

const Getcomplain = () => {
    const [id,setId]=useState();
    const [result,setResult] = useState([]);


   const fetchPetition =()=>{
        axios.post("http://localhost:5000/getpetition", {
      complain_id:id
    })
    .then((response) => {
      console.log(response.data.complain);
      setResult(response.data.complain);
    })
    .catch((error) => {
        setResult([])
        console.log(error.response);
    })
}
  return (
    
    <div  className='flex flex-col max-w-md mx-auto'>
      <h1 className='text-3xl text-teal-500 py-2 ' >Check Complain Details and Status</h1>
      <TextField type='number' id="outlined-basic" label="Enter Complain Id" variant="outlined" onChange={(e)=>setId(e.target.value)}/>
       <br/>
       <Button variant="contained" onClick={fetchPetition}>Get complain</Button>

        {Object.entries(result).map(([key,value])=>{
            return(
            <div>{key}: {value}</div>
            )
        })}
    </div>
    
  )
}

export default Getcomplain