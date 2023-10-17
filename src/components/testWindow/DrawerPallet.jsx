import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import QuestionPallet from './QuestionPallet';


export default function DrawerPallet({
    showPallet,
    selectedSection,
    setSelectedQuestion, 
    selectedQuestion,
    previousQuestionRef,
    lastQuestion,
    matches,
    state,toggleDrawer
}) {
  
  

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
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
