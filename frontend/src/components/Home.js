import React, { useEffect, useState } from 'react'

import Natemb from '../assests/National-Emblem.png';
import pypolemb from '../assests/pypol-embl.jpg';
import pypoltext from '../assests/pypol-name.jpg';

import Getcomplain from './Status/Getcomplain';



import 'react-circular-progressbar/dist/styles.css';





const Home = () => {
 
  return (
  

<div  className=' mx-auto w-full flex flex-col min-h-[100vh] items-center justify-center  md:ml-[25%] '>
      <img class="  rounded-2xl rounded-bl-2xl" src={pypoltext} alt="image" />
    
   
        <h1 className='text-5xl py-4 text-center font-mono text-[#0d193a]'>Petition Monitoring System</h1>

<div className='flex flex-row gap-5'>
        <Getcomplain/>
      
      
        </div>
      

</div>
      

  )
}



export default Home;