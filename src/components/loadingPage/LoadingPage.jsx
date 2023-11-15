import React, { useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  
  const navigate = useNavigate()
  const localStorageKey = 'userData';
  const getSessionUserData = () => {
      return JSON.parse(localStorage.getItem(localStorageKey));
  };

  const logout = () => {
    localStorage.removeItem(localStorageKey);
    navigate("/login")
  };


  useEffect(() => {
    const sessionUserData = getSessionUserData();
    if (sessionUserData) {
        if (!sessionUserData.token) {
            navigate("/login")
        }
        else{
            navigate("/dashboard")
        }
    } else {
        logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className='flex flex-col justify-center border items-center h-[100dvh]'>
        <Typography variant='h3'>Loading...</Typography>
           <div className='w-96'>
           <LinearProgress />
           </div>
    </div>
  )
}

export default LoadingPage