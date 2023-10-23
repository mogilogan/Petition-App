import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {assignsp, assignssp, fetchall} from '../../actions/petition';






import {sspData} from '../../assests/ssp'
import { useNavigate } from 'react-router-dom';






const Petitions = () => {


  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [selectedValue,setSelectedValue] = useState("");
  const [selectedssp,setSelectedssp] = useState({ });
  const [selectedsp,setSelectedsp] = useState({ });
  const [sspremarks,setSspremarks] = useState("");
  const [spremarks,setSpremarks] = useState("");
  const [selectedpetition,setSelectedpetition] = useState("");
  const [error, setError] = useState("");


useEffect(() => {
  setSelectedValue("select");
}, [])

  
  const dispatch = useDispatch();


const navigate = useNavigate();

  const { petitions, isLoading } = useSelector((state) => state.petition);


 

const handleChange = async(e) =>{

  if (e.target.value === "select") {
    setSelectedValue(e.target.value);
  } else {
    setSelectedValue(e.target.value);
 setError("");
  const ok = await dispatch(fetchall(user.userData,e.target.value));
  console.log(ok);
  setError(ok);
  }
  
}


const handlessp = (petition_id) => {
console.log(petition_id);
  dispatch(assignssp({petition_id: petition_id ,dept_name: selectedssp[petition_id], remarks: sspremarks}));
} 

const handlesp = (petition_id) => {
  console.log(petition_id);
    dispatch(assignsp({petition_id: petition_id ,sub_dept: selectedsp[petition_id],remarks: spremarks}));
  } 
  

const handlesspchange = (e,petition_id) =>{
  
  setSelectedpetition(petition_id);
setSelectedssp((prevSelectedssp) => ({
    ...prevSelectedssp,
    [petition_id]: e.target.value,
  }));

}

const handlespchange = (e,petition_id) =>{
  
  setSelectedpetition(petition_id);
setSelectedsp((prevSelectedsp) => ({
    ...prevSelectedsp,
    [petition_id]: e.target.value,
  }));

}
const handlesspremarks =(e)=>{
  setSspremarks(e.target.value);
}
const handlespremarks =(e)=>{
  setSpremarks(e.target.value);
}


const handleview = (petition_id) =>{
  
navigate(`/petition/:${petition_id}`);


}



  return (
    <div className=' w-[100%] pt-16 flex flex-col min-h-[100vh]  md:ml-[25%]   bg-[#b6a072] ' >


      <div className='flex flex-row justify-center'>
        
       <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
       <p className='flex-none text-lg'>Filter By:</p>
        <select value={selectedValue} onChange={(e)=>handleChange(e)}   class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
            <option value="select">Select</option>
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="closed">Closed</option>
          
        </select>
        </div>


     
   
        </div>
      
        {selectedValue != 'select' ?

<section class="container mx-auto p-6 font-mono">

<div class="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
<div class="w-full overflow-x-auto">

      <table className="w-full">
        
      <thead >
      <tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">

            <th class="px-4 py-3">Petition Id</th>
            <th class="px-4 py-3">Title</th>
            <th class="px-4 py-3">Date of Petition</th>

            {selectedValue === "new" && (<>

            {
        {
          '1': <><th class="px-4 py-3" align="right">Select SSp</th>
          <th class="px-4 py-3" align="right">Remarks</th>
          <th class="px-4 py-3" align="right">Assign Ssp</th></>,
          '2':<> <th class="px-4 py-3" align="right">Select Sp </th>
          <th class="px-4 py-3" align="right">Remarks</th>
          <th cclass="px-4 py-3" align="right">Assign SP</th></>,
          '3': <><th class="px-4 py-3" align="right">Select Circle Inspector </th>
          <th class="px-4 py-3" align="right">Remarks</th>
          <th class="px-4 py-3" align="right">Assign Circle Inspector</th></>,
          '4': <><th class="px-4 py-3" align="right">Select Sho </th>
          <th class="px-4 py-3" align="right">Remarks</th>
          <th class="px-4 py-3" align="right">Assign Sho</th></>
        
        }[user.userData.rank]
      }
            
              </>)}
            
            <th class="px-4 py-3" align="right">View Petition</th>

          </tr>
        
</thead>

        <tbody class="bg-white">
          {petitions.map((petition) => (
            <tr class="text-gray-700"
              key={petition.petition_id}
             
            >
             
              <td class="px-4 py-3 border" align="center">{petition.petition_id}</td>
              <td class="px-4 py-3 border" align="right">{petition.title}</td>
              <td class="px-4 py-3 border" align="right">{petition.time_stamp.slice(0,10)}</td>


              {selectedValue === "new" && <div>
{
                {
               "1":<>  
              <td class="px-4 py-3 border" >
              <select value={selectedssp[petition.petition_id] || ""} onChange={(e)=>handlesspchange(e,petition.petition_id)} >
              {Object.keys(sspData).map((ssp) =>(   
                <option value={ssp}>{ssp}</option>
              ))}
              
               </select>
              </td>
              </> ,
              "2": <>  
              <td align="right" class="px-4 py-3 border">
              <select value={selectedsp[petition.petition_id] || ""} onChange={(e)=>handlespchange(e,petition.petition_id)} >

              {sspData[user.userData.dept_name]!== (null ||undefined) ? 
              <>
              {Object.keys(sspData[user.userData.dept_name]).map((sp,index) =>(   
                <option key={index} value={sp}>{sp}</option>
                 
              ))}</>
               : <>bad req</>
              }

               </select>
              </td>

              </>
}[user.userData.rank]
               
               } 
               </div>}




               {selectedValue === "new" && <>
{
                {
               "1":<>  
               <td><textarea class="px-4 py-3 border" onChange={(e)=>handlesspremarks(e)}></textarea></td>
              <td class="px-4 py-3 border"><button onClick={()=>handlessp(petition.petition_id)} disabled={selectedpetition !== petition.petition_id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Assign SSP</button></td>

              </> ,
              "2": <>  
              <td><textarea class="px-4 py-3 border" onChange={(e)=>handlespremarks(e)}></textarea></td>
              <td align="right"class="px-4 py-3 border" ><button onClick={()=>handlesp(petition.petition_id)} disabled={selectedpetition !== petition.petition_id} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >Assign SP</button></td>

              </>
}[user.userData.rank]
               
               } 
               </>}

             



                <td align="right" class="px-4 py-3 border"><button onClick={()=>handleview(petition.petition_id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" >View</button></td>
               </tr>
          ))}



        </tbody>
      </table>
  
    {error !== (null || undefined) ? <p className='md:text-2xl text-lg text-center  py-4'>{error}</p> : <></>}
</div>
</div>
    </section>
    :<>
    <p>Select a Filter!</p>
    </>}
  
    </div>
  
  )
}

export default Petitions