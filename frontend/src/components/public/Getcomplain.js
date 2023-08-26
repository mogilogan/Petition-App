import React, { useState } from 'react'
import axios from 'axios'

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
        console.log(error.response.data);
    })
}
  return (
    
    <div>
        <input type="number" placeholder='Enter Complain id' onChange={(e)=>setId(e.target.value)}/>
        <button type='submit' onClick={fetchPetition}>Get</button>

        {Object.entries(result).map(([key,value])=>{
            return(
            <div>{key}: {value}</div>
            )
        })}






    </div>
    
  )
}

export default Getcomplain