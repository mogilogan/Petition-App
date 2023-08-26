import React,{useState} from 'react';
import axios from 'axios';

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

  return (
    <div>
<h1>add Complain</h1>
<input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Enter Title' /> 
    <input type='text' onChange={(e)=>setCategory(e.target.value)} placeholder='Enter Category' /> 
    <input type='text' onChange={(e)=>setDescription(e.target.value)} placeholder='Enter Description' /> 
    <button onClick={handlePetition}>Add Complain</button>
    </div>
  )
}

export default Postpetition;