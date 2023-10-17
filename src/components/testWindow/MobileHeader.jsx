import React from 'react'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SegmentIcon from '@mui/icons-material/Segment';
import IconButton from '@mui/material/IconButton';
import Countdown from 'react-countdown';

const MobileHeader = ({toggleDrawer}) => {
  return (
    <main className=' bg-black flex justify-between items-center py-1'>
        <div className='left pl-3 flex items-center gap-2'>
            <PauseCircleOutlineIcon sx={{color:"white"}}/>

            <div className='text-white'>
                <Countdown date={Date.now() + 1000000}  className='font-semibold'/>
                <p>RRb group D exam</p>
            </div>
        </div>
        
        <IconButton aria-label="delete" onClick={toggleDrawer("right",true)}>
            <SegmentIcon sx={{color:"white"}}/>
        </IconButton>
       
    </main>
  )
}

export default MobileHeader