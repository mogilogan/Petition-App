import React, { useEffect, useState } from 'react'

import Natemb from '../assests/National-Emblem.png';
import pypolemb from '../assests/pypol-embl.jpg';
import pypoltext from '../assests/pypol-name.jpg';

import Getcomplain from './Status/Getcomplain';
import {ongoingcount} from '../actions/count';
import { useDispatch, useSelector } from 'react-redux';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


import 'react-circular-progressbar/dist/styles.css';





const Home = () => {
  const { count } = useSelector((state) => state.petition);
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

const dispatch  = useDispatch();

  useEffect(() => {
    console.log(user);
    if(user != (null||undefined)) {
    dispatch(ongoingcount(user.userData));
    }
  }, [])
  
  return (
  

<div  className=' mx-auto w-full flex flex-col min-h-[100vh] items-center justify-center  md:ml-[25%] '>
      <img class="  rounded-2xl rounded-bl-2xl" src={pypoltext} alt="image" />
    
   
        <h1 className='text-5xl py-4 text-center font-mono text-[#0d193a]'>Petition Monitoring System</h1>

<div className='flex flex-row gap-5'>
        <Getcomplain/>
        <div>
          
{user != (null||undefined) &&
<>
{count != (null||undefined) ? <>   <Example label="Ongoing">
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
export default Home;