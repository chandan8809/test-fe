import React from 'react'
import Header from './Header'
import Section from './Section'
import useMediaQuery from '@mui/material/useMediaQuery';


const MainWindow = () => {
  const matches = useMediaQuery('(min-width:600px)');
  return (
    <div>
        {matches && <Header/>}
        <Section/>
    </div>
  )
}

export default MainWindow