import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import QuestionPallet from './QuestionPallet';


export default function DrawerPallet({
    showPallet,
    selectedSection,
    setSelectedQuestion, 
    selectedQuestion,
    previousQuestionRef,
    lastQuestion,
    matches
}) {
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
           <QuestionPallet
            matches={matches}
            showPallet={showPallet} 
            selectedSection={selectedSection} 
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
            previousQuestionRef={previousQuestionRef}
            lastQuestion={lastQuestion}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
