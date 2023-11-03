import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { statuscheck } from '../../../actions/status';
import Table from '../../Status/Table';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';




const events = [
  {
    date: '2023-01-01',
    title: 'Event 1',
    description: 'Description of Event 1',
  },
  {
    date: '2023-03-15',
    title: 'Event 2',
    description: 'Description of Event 2',
  },
  {
    date: '2023-06-30',
    title: 'Event 3',
    description: 'Description of Event 3',
  },
  {
    date: '2023-06-30',
    title: 'Event 3',
    description: 'Description of Event 3',
  },
  // Add more events as needed
];

const Petition = () => {

   const { currentId } = useParams();

   const { petition } = useSelector((state) => state.status);

   

   const currentIds = currentId.slice(1);
   console.log(currentIds);

const dispatch = useDispatch();


const fetch = async ()=>{
  dispatch(statuscheck({petition_id: currentIds}));

  
}

 useEffect(() => {

   fetch();
  
 }, [])
 

    
  return (
    <div className=' w-[100%] pt-16  flex flex-col min-h-[100vh] md:ml-[25%]  bg-[#b6a072] ' >

{ petition ? 
<div className='py-[40px]'>
<div className='max-w-[80%] mx-auto bg-white rounded-lg'>
  <div className='px-8'>
<p className='py-5 text-xl md:text-4xl font-libre text-center text-black' component="h1" variant='h5'>Petition</p>
<label class="block text-black text-sm font-bold mb-2" for="username">
        Petition Id:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.petition_id}</p>


    <label class="block text-black text-sm font-bold mb-2" for="username">
        Petitioner Name :
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.p_name}</p>

    <label class="block text-black text-sm font-bold mb-2" for="username">
        Mobile Number
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.mobile_num}</p>

    <label class="block text-black text-sm font-bold mb-2" for="username">
        Address
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.address}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
        Title:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.title}</p>
    <label class="block text-black text-sm font-bold mb-2 pt-4" for="username">
        Description:
      </label>
    <p className='shadow h-[400px]  appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="description"  label="Description"  type='text'  >{petition.description}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
        Time Created:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.time_stamp}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
        Department Assigned:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.dept}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
        Sub Department:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.sub_dept === null ? "Not Assigned" : petition.sub_dept}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
        Circle Department:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.circle_insp === null ? "Not Assigned" : petition.circle_insp}</p>
    <label class="block text-black text-sm font-bold mb-2" for="username">
       User name:
      </label>
    <p className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline' name="title" label="Title" type='text' >{petition.user_name === null ? "Not Assigned" : petition.user_name}</p>


   <br/>
   </div>
   </div>
   </div>
 : <></>}

<Timeline >
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {petition.time_stamp}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Time Created</TimelineContent>
      </TimelineItem>


      {petition.dept_time!= null ? 
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {petition.dept_time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Department Assigned</TimelineContent>
      </TimelineItem>
      : <></>}

      {petition.sub_time!= null ? 
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {petition.sub_time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Department Assigned</TimelineContent>
      </TimelineItem>
      : <></>}
      {petition.sho_time!= null ? 
      <TimelineItem>
        <TimelineOppositeContent color="text.secondary">
          {petition.sho_time}
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Department Assigned</TimelineContent>
      </TimelineItem>
      : <></>}
    </Timeline>
    </div>
  )
}

export default Petition