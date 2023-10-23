import React from 'react'

const Table = ({petition_id,date,status}) => {
  return (
    <div>
        

        <table >
  <thead>
    <tr className='border-[2px] border-blue-900 text-[#252525]   text-[20px] md:text-[30px]'>
      <th className='px-2 py-2 border-blue-900  border'>PETITION ID</th>
      <th className='px-2 py-2 border-blue-900  border'>DATE</th>
      <th className='px-2 py-2 border-blue-900  border'>Status</th>
    </tr>
  </thead>
  <tbody>
    <tr className='border-[2px] border-blue-900 text-[20px]  md:text-[30px]'>
      <td className='px-2 py-2 border-blue-900  border'>{petition_id}</td>
      <td className=' px-2 py-2 border-blue-900  border'>{date}</td>
      <td className='py-2   px-2 border-blue-900 border'>{status}</td>
    </tr>
   
  </tbody>
</table>
    </div>
  )
}

export default Table