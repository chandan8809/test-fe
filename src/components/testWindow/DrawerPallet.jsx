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
    bigScreenView,
    state,
    toggleDrawer,
    questionData,
    selectedItem,
    setSelectedItem,
    setSelectedSection,
    scrollToItem,
    attemptedAnswer,
    questionStatusObj,
    setQuestionStatus
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
            bigScreenView={bigScreenView}
            showPallet={showPallet} 
            setSelectedSection={setSelectedSection}
            selectedSection={selectedSection} 
            setSelectedQuestion={setSelectedQuestion}
            selectedQuestion={selectedQuestion}
            previousQuestionRef={previousQuestionRef}
            lastQuestion={lastQuestion}
            dialog={"true"}
            questionData={questionData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            scrollToItem={scrollToItem}
            attemptedAnswer={attemptedAnswer}
            questionStatusObj={questionStatusObj}
            setQuestionStatus={setQuestionStatus}
            />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
