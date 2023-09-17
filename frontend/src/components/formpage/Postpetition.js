import React,{useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-date-picker';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';


import { Button, TextField,Input,Typography } from '@mui/material';


import {addpetition,clearmessage} from '../../actions/petition';


const initialState = {title:"",description:"",end_date:""};


const Postpetition = () => {

  const { added } = useSelector((state) => state.adders);
  const [mess,setMess] = useState(false)

  const [form,setForm] = useState(initialState);
  const dispatch = useDispatch();

 const handleaddPetition =async (e)=>{
      e.preventDefault();
      dispatch(addpetition(form));
      setForm(initialState);
      setMess(true);
  }

  const dateselect = (e)=>{setForm({...form,"end_date": e})}

  const handleChange = (e) => { 
  setForm({ ...form, [e.target.name]: e.target.value });
  setMess(false);
  }

const user=localStorage.getItem('profile');
  return (
    <div  className='flex flex-col max-w-md mx-auto'>

    <p>Login Page</p>

<Typography component="h1" variant='h5'>Add Petition</Typography>
<form className='flex flex-col' onSubmit={handleaddPetition}>
    <Input name="title" label="Title" type='text' value={form.title} onChange={(e)=>handleChange(e)} variant='outlined'/>
    <Input name="description" label="Description" value={form.description} type='text' onChange={(e)=>handleChange(e)} variant='outlined'/>
    <p >Enter End Date:</p><DatePicker value={form.end_date} dateFormat="yyyy/mm/dd"    onChange={(e) => dateselect(e)}   ></DatePicker>
    {form.title!=="" && form.description!=="" && form.end_date!== "" && <Button variant='contained' type='submit' color='primary'>submit</Button>}
    
    </form>
   <br/>
    
{/* {added[0].message !==null && <p>{added[0].message} with id {added[0].complain_details.title}</p> } */}

    </div>
  )
}

export default Postpetition;