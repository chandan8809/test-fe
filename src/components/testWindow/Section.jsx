import React, { useRef, useState } from 'react'
import Questions from './Questions';
import QuestionPallet from './QuestionPallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import questionData from './../../data/questions.json'
import DrawerPallet from './DrawerPallet';





const Section = ({matches,state,toggleDrawer}) => {
    const [showPallet,setShowPallet]=useState(true)
    const [selectedSection, setSelectedSection]=useState(questionData[0])
    const [selectedQuestion,setSelectedQuestion]=useState(questionData[0].questionList[0])
    const previousQuestionRef = useRef(null);
    const [lastQuestionFlag,setLastQuestionFlag]=useState(0)

    
  return (
    <div className='flex h-[calc(100dvh-65px)] relative'>
        <DrawerPallet  
          matches={true}
          showPallet={showPallet} 
          selectedSection={selectedSection} 
          setSelectedQuestion={setSelectedQuestion}
          selectedQuestion={selectedQuestion}
          previousQuestionRef={previousQuestionRef}
          lastQuestion={lastQuestionFlag}
          state={state}
          toggleDrawer={toggleDrawer}
          />

         {matches &&<section className={`absolute top-[calc(50vh-60px)] ${showPallet ? "right-[300px]" :"right-[0px]"}`}>
            <div 
             className='border border-gray-700 bg-gray-800 text-white h-[50px] flex items-center rounded-l-sm'
             onClick={()=>setShowPallet(!showPallet)}
             >
                {showPallet  ?<ArrowForwardIosIcon sx={{height:"15px",width:"15px"}}/> : <ArrowBackIosOutlinedIcon sx={{height:"15px",width:"15px"}}/>}
            </div>
        </section>}

        <Questions 
        matches={matches}
          questionData={questionData} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          previousQuestionRef={previousQuestionRef}
          setLastQuestion={setLastQuestionFlag}
         
          />
        <QuestionPallet 
          matches={matches}
          showPallet={showPallet} 
          selectedSection={selectedSection} 
          setSelectedQuestion={setSelectedQuestion}
          selectedQuestion={selectedQuestion}
          previousQuestionRef={previousQuestionRef}
          lastQuestion={lastQuestionFlag}
          />
    </div>

  );
}

export default Section