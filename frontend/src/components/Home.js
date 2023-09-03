import React from 'react'

import Natemb from '../assests/National-Emblem.png';
import pypolemb from '../assests/pypol-embl.jpg';
import pypoltext from '../assests/pypol-name.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>

{/* <div className='max-w-[20px]'>
  <img src={Natemb}  class="h-auto max-w-[20px]" />
  <img src={pypoltext} class="h-auto md:w-[200px]" />
  <img src={pypolemb} class="h-auto max-w-[150px]"  />

</div> */}



    <div class="flex  justify-center items-center">
      <img class="  rounded-2xl rounded-bl-2xl" src={pypoltext} alt="image" />
    
    </div>
    

        <h1 className='text-5xl py-4 font-mono'>Petition Monitoring System</h1>

<div className='flex bg-gray-700 py-6'>
<div className='mx-auto gap-3 '>
        <Link to="/"><button className='px-2 bg-red-400 rounded-md'>Home</button></Link>
        </div>
        <div className='mx-auto gap-3 '>
        <Link to="/login"><button className='px-2 bg-red-400 rounded-md'>Login</button></Link>
        </div>
        <div className='mx-auto gap-3 '>
        <Link to="/signup"><button className='px-2 bg-red-400 rounded-md'>Sign Up</button></Link>
        </div>
        <div className='mx-auto gap-3 '>
        <Link to="/petition/add" className='px-2 bg-red-400 rounded-md'><button>Add petition</button></Link>
        </div>
        </div>
    </div>
  )
}

export default Home