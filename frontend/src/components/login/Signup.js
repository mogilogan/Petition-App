import React,{useState} from 'react'
import axios from 'axios';

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
    <div>

    <p>SignUp Page</p>

    <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter Name' /> 
    <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username' /> 
    <input type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter password' /> 
    <input type='number' onChange={(e)=>setPhonenumber(e.target.value)} placeholder='Enter Phone Number' /> 
    <input type='text' onChange={(e)=>setDepartment(e.target.value)} placeholder='Enter Department' /> 
    <input type='text' onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category' /> 
    <button type='submit' onClick={handlelogin}>submit</button>


    </div>
  )
}

export default Signup