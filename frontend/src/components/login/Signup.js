import React,{useState} from 'react'
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Signup = () => {
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [phonenumber,setPhonenumber]=useState();
    const [department,setDepartment]=useState("");
    const [category,setCategory]=useState("");
    
   

    const handlelogin = () => {
      
        axios.post("http://localhost:5000/signup", {
      
      name:name,
      user_name: username,
      password: password,
      ph_num: phonenumber,
      dept_id: department,
      cate_id:category
    })
    .then((response) => {
      console.log(response.data);
    
});

    }

  return (
    <div  className='flex flex-col max-w-md mx-auto'>

    <p className='text-2xl font-sans text-teal-500'>SignUp Page</p>

    <TextField variant='outlined' type='text' onChange={(e)=>setName(e.target.value)} label='Enter Name' /> 
    <TextField variant='outlined' type='text' onChange={(e)=>setUsername(e.target.value)} label='Enter username' /> 
    <TextField  variant='outlined'type='password' onChange={(e)=>setPassword(e.target.value)} label='Enter password' /> 
    <TextField  variant='outlined'type='number' onChange={(e)=>setPhonenumber(e.target.value)} label='Enter Phone Number' /> 
    <TextField variant='outlined'type='text' onChange={(e)=>setDepartment(e.target.value)} label='Enter Department' /> 
    <TextField variant='outlined'type='text' onChange={(e)=>setCategory(e.target.value)} label='Enter Category' /> 
    <br/>
    <Button type='submit' variant='contained' onClick={handlelogin}>submit</Button>


    </div>
  )
}

export default Signup