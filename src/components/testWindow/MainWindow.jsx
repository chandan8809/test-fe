import React from 'react'
import Header from './Header'
import Section from './Section'
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from './MobileHeader';


const MainWindow = () => {
  const bigScreenView = useMediaQuery('(min-width:600px)');
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);


  return (
    <div>
        {bigScreenView && <Header expiryTimestamp={time}/>}
        {!bigScreenView && <MobileHeader toggleDrawer={toggleDrawer}/>}
        <Section bigScreenView={bigScreenView} state={state} toggleDrawer={toggleDrawer}/>
    </div>
  )
}

export default MainWindow