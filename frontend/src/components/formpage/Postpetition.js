import React,{useState} from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const Postpetition = () => {

    const [title,setTitle] = useState('');
    const [category,setCategory] = useState('');
    const [description,setDescription] = useState('');

    const handlePetition =()=>{
        axios.post("http://localhost:5000/petition/add", {
      title:title,
      cate_id:category,
      complain_desc:description
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
        console.log(error.response);
    })
}
const user=localStorage.getItem('profile');
  return (
    <div className='flex flex-col max-w-md mx-auto'>
      {user}
<h1>add Complain</h1>
<TextField type='text' onChange={(e)=>setTitle(e.target.value)} label='Enter Title' /> 
    <TextField type='text' onChange={(e)=>setCategory(e.target.value)} label='Enter Category' /> 
    <TextField type='text' onChange={(e)=>setDescription(e.target.value)} label='Enter Description' /> 
    <br/>
    <Button variant='contained' onClick={handlePetition}>Add Complain</Button>
    </div>
  )
}

export default Postpetition;