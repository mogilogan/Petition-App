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
   const [message,setMessage] = useState("");

    // handle login actions::
    const handlelogin =  async(e) => {
       e.preventDefault();
       const mess = await dispatch(signin(form,navigate));
       setMessage(mess);
    }

    //handle change actions:
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
           <div  className=' w-[100%]  flex flex-col min-h-[100vh] items-center justify-center md:ml-[25%]    bg-[#b6a072]'>

                <Typography className='py-8 text-center' component="h1" variant='h5'>Sign in</Typography>

                <form class="bg-white max-w-lg mx-auto shadow rounded px-16 pt-6 pb-8 mb-4" onSubmit={handlelogin}>
                   
                  <div class="mb-4">
                       <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Username</label>
                       <Input onChange={(e)=>handleChange(e)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="user_name" label="Username" type='text' placeholder='Username' variant='outlined'/>
                  </div>
                  <div class="mb-6">
                       <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
                       <Input onChange={(e)=>handleChange(e)} class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" name="password" label="password" type='password' placeholder="******************"  variant='outlined'/>
                       <p class="text-red-500 text-xs italic">{message}</p>
                  </div>
                  <div class="flex items-center justify-between">
                       <Button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" variant='contained' type='submit' color='primary'>submit</Button>
                  </div>
                </form>
                <br/>
    
           </div>
           
  )
}

export default Login;