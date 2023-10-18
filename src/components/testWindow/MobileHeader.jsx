import React from 'react'
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import SegmentIcon from '@mui/icons-material/Segment';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { useTimer } from 'react-timer-hook';
import { formatTime } from '../helper/MinTwoDigit';

const MobileHeader = ({toggleDrawer,expiryTimestamp}) => {
    const {
        totalSeconds,
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });
    const [isFullScreen, setIsFullScreen] = React.useState(false);

    const toggleFullScreen = () => {
        if (!isFullScreen) {
          // Enter full-screen mode
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.mozRequestFullScreen) { // Firefox
            document.documentElement.mozRequestFullScreen();
          } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
            document.documentElement.msRequestFullscreen();
          }
        } else {
          // Exit full-screen mode
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.mozCancelFullScreen) { // Firefox
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) { // IE/Edge
            document.msExitFullscreen();
          }
        }
            // Toggle the full-screen state
    setIsFullScreen(!isFullScreen);
   }  

  return (
    <main className=' bg-black flex justify-between items-center py-1'>
        <div className='left pl-5 flex items-center gap-2'>
            <PauseCircleOutlineIcon  sx={{color:"white", height:"30px", width:"30px"}}/>

            <div className='text-white'>
                <div style={{fontSize: '15px'}} className='font-semibold'>
                <span>{formatTime(hours) }</span>:<span>{formatTime( minutes)}</span>:<span>{ formatTime(seconds)}</span>
                </div>
                <p>RRb group D exam</p>
            </div>
        </div>
        
        <div>
            <CropSquareIcon onClick={toggleFullScreen} sx={{color:"white", height:"34px", width:"34px"}}/>
            <SegmentIcon onClick={toggleDrawer("right",true)} sx={{color:"white", height:"40px", width:"60px"}}/>
        </div>
     
       
    </main>
  )
}

export default MobileHeader