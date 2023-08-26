import React,{useState} from 'react'
import axios from 'axios';

const Login = () => {
   
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");

    const handlelogin = () => {
      
        axios.post("http://localhost:5000/", {
      user_name: username,
      password: password
    })
    .then((response) => {
      console.log(response.data);
    
});

    }

  return (
    <div>

    <p>Login Page</p>

    <input type='text' onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username' /> 
    <input type='text' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password' /> 
    <button type='submit' onClick={handlelogin}>submit</button>


    </div>
  )
}

export default Login;