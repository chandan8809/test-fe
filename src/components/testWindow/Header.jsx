import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import testAppImage from "./../../assets/testAppLogo.png"
import { Stack } from '@mui/material';
import { useTimer } from 'react-timer-hook';
import { formatTime } from '../helper/MinTwoDigit';



function Header({ expiryTimestamp }) {
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
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Stack direction="row" spacing={2}   alignItems="center">
            <img src={testAppImage} alt='logo' className='h-8'/>
            <Typography
            component="p"
            variant="p"
            color="inherit"
            align="center"
            noWrap
            >
             {"Junior Executive (common cred) Full Mock Test"}
            </Typography>
        </Stack>


    
       <Stack sx={{ flex: 1 }} direction="row" spacing={2}   alignItems="center" justifyContent={"center"} >
        <div className='flex gap-2 bg-gray-100 px-4 py-3 rounded-sm'>
            <Typography
        
            component="p"
            variant="p"
            color="inherit"
            align="center"
            noWrap
        
            >
            {"Time Left"}
            </Typography>
            <div style={{fontSize: '15px'}} className='font-medium'>
            <span className='bg-gray-500 px-1 py-0.5 text-white text-sm rounded-sm'>{ formatTime(hours) }</span> : <span className='bg-gray-500 px-1 py-0.5 text-white text-sm rounded-sm'>{ formatTime(minutes)}</span> : <span className='bg-gray-500 px-1 py-0.5 text-white text-sm rounded-sm'>{formatTime(seconds)}</span>
            </div>
        </div>
       </Stack>


       
       <Stack  direction="row" spacing={1}   alignItems="center" justifyContent={"center"} >
        <Button variant="outlined" size="small" style={{textTransform: 'none', fontSize:"15px"}}  onClick={toggleFullScreen}>
        {isFullScreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
        </Button>

        <Button variant="outlined" size="small" style={{textTransform: 'none',fontSize:"15px"}} >
          Pause
        </Button>
        </Stack>
       
      </Toolbar>
      
    </React.Fragment>
  );
}


export default Header;