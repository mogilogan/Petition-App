import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Input, TextField, Typography } from '@mui/material';


import { signin } from '../../actions/auth';

const initialState = {user_name:'', password:''};

const Login = () => {
   
   const [form,setForm] = useState(initialState);
   const dispatch = useDispatch();
   const navigate = useNavigate();
  

   // show password actions:
   const [showpassword,setShowpassword] = useState(false);
   const handleShowpassword = () => setShowpassword(!showpassword);

    // handle login actions::
    const handlelogin = (e) => {
       e.preventDefault();
       dispatch(signin(form,navigate));
    }

    //handle change actions:
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div  className='flex flex-col max-w-md mx-auto'>

    <p>Login Page</p>

<Typography component="h1" variant='h5'>Sign in</Typography>
<form onSubmit={handlelogin}>
    <Input name="user_name" label="Username" type='text' onChange={(e)=>handleChange(e)} variant='outlined'/>
    <Input name="password" label="password" type='text' onChange={(e)=>handleChange(e)} variant='outlined'/>
    <Button variant='contained' type='submit' color='primary'>submit</Button>
    </form>
   <br/>
    


    </div>
  )
}

export default Login;