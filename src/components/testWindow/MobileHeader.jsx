import React from 'react'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SegmentIcon from '@mui/icons-material/Segment';

import Countdown from 'react-countdown';
import SubjectIcon from '@mui/icons-material/Subject';

const MobileHeader = ({toggleDrawer}) => {
  return (
    <main className=' bg-black flex justify-between items-center py-1'>
        <div className='left pl-5 flex items-center gap-2'>
            <PauseCircleOutlineIcon  sx={{color:"white", height:"30px", width:"30px"}}/>

            <div className='text-white'>
                <Countdown date={Date.now() + 1000000}  className='font-semibold'/>
                <p>RRb group D exam</p>
            </div>
        </div>
        
      
        <SegmentIcon onClick={toggleDrawer("right",true)} sx={{color:"white", height:"40px", width:"60px"}}/>
     
       
    </main>
  )
}

export default MobileHeader