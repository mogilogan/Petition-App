import React,{useState} from 'react'

import {ongoingcount} from '../../actions/count';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Dashboard = () => {
  const [selectedValue,setSelectedValue] = useState("");

    const { count } = useSelector((state) => state.petition);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  
  const dispatch  = useDispatch();

  const handleChange = async(e) =>{

    if (e.target.value === "select") {
      setSelectedValue(e.target.value);
    } else {
      setSelectedValue(e.target.value);
      const formData= {"type":e.target.value,"rank":user.userData.rank,"user_name":user.userData.user_name};
     
      console.log(formData);
    

    const ok = await dispatch(ongoingcount(formData));
   
    }
    
  }
  
  
  
    
    
  return (
    <div  className=' mx-auto w-full flex flex-col min-h-[100vh] items-center justify-center  md:ml-[25%] '>

        <div class=" px-4 flex items-center text-sm font-medium leading-none text-gray-600 bg-gray-200 hover:bg-gray-300 cursor-pointer rounded">
       <p className='flex-none text-lg'>Filter By:</p>
        <select value={selectedValue} onChange={(e)=>handleChange(e)}   class=" focus:text-indigo-600 focus:outline-none bg-transparent ml-1">
            <option value="select">Select</option>
            <option value="all">All</option>
            <option value="new">New</option>
            <option value="ongoing">Ongoing</option>
            <option value="closed">Closed</option>
          
        </select>
        </div>

          <div>
          
          {user !== (null||undefined) &&
          <>
          {count !== (null||undefined) ? <>   <Example label="Ongoing">
          <CircularProgressbar
                  value={count.ongoing}
                  maxValue={count.total_rows}
                  text={`${count.ongoing}`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                  })}
                />
              </Example>
                
                
                <Example label="Closed">
                <CircularProgressbar
                  value={count.closed}
                  maxValue={count.total_rows}
                  text={`${count.closed}`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                  })}
                /></Example>
                
                
                
                
                <Example label="new">
                <CircularProgressbar
                  value={count.new}
                  maxValue={count.total_rows}
                  text={`${count.new}`}
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                  })}
                /></Example>
                
                
                
           </> : <p>no petition</p> }
           </>
                }
                
           </div>
    </div>
  )
}

function Example(props) {
    return (
      <div style={{ marginBottom: 40 }}>
        <hr style={{ border: "2px solid #ddd" }} />
        <div style={{ marginTop: 30, display: "flex" }}>
          <div style={{ width: "30%", paddingRight: 30 }}>{props.children}</div>
          <div style={{ width: "70%" }}>
            <h3 className="h5">{props.label}</h3>
            <p>{props.description}</p>
          </div>
        </div>
      </div>
    );
  }

export default Dashboard