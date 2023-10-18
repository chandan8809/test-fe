import React, { useRef, useState } from 'react'
import Questions from './Questions';
import QuestionPallet from './QuestionPallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import questionData from './../../data/questions.json'
import DrawerPallet from './DrawerPallet';





const Section = ({bigScreenView,state,toggleDrawer}) => {
    const [showPallet,setShowPallet]=useState(true)
    const [selectedSection, setSelectedSection]=useState(questionData[0])
    const [selectedQuestion,setSelectedQuestion]=useState(questionData[0].questionList[0])
    const previousQuestionRef = useRef(null);
    const [lastQuestionFlag,setLastQuestionFlag]=useState(0)
    const [selectedItem, setSelectedItem] = useState(null);

    const containerRef = useRef(null);
  
  
    const scrollToItem = (itemIndex) => {
      const item = containerRef.current.children[itemIndex];
      item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    };

    
  return (
    <div className='flex h-[calc(100dvh-65px)] relative'>
        <DrawerPallet  
          bigScreenView={true}
          showPallet={showPallet} 
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection} 
          setSelectedQuestion={setSelectedQuestion}
          selectedQuestion={selectedQuestion}
          previousQuestionRef={previousQuestionRef}
          lastQuestion={lastQuestionFlag}
          state={state}
          toggleDrawer={toggleDrawer}
          questionData={questionData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          scrollToItem={scrollToItem}
         
          />

         {bigScreenView &&<section className={`absolute top-[calc(50vh-60px)] ${showPallet ? "right-[300px]" :"right-[0px]"}`}>
            <div 
             className='border border-gray-700 bg-gray-800 text-white h-[50px] flex items-center rounded-l-sm'
             onClick={()=>setShowPallet(!showPallet)}
             >
                {showPallet  ?<ArrowForwardIosIcon sx={{height:"15px",width:"15px"}}/> : <ArrowBackIosOutlinedIcon sx={{height:"15px",width:"15px"}}/>}
            </div>
        </section>}

        <Questions 
        bigScreenView={bigScreenView}
          questionData={questionData} 
          selectedSection={selectedSection} 
          setSelectedSection={setSelectedSection}
          selectedQuestion={selectedQuestion}
          setSelectedQuestion={setSelectedQuestion}
          previousQuestionRef={previousQuestionRef}
          setLastQuestion={setLastQuestionFlag}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          containerRef={containerRef}
          scrollToItem={scrollToItem}
         
          />
        <QuestionPallet 
          bigScreenView={bigScreenView}
          showPallet={showPallet} 
          setSelectedSection={setSelectedSection}
          selectedSection={selectedSection} 
          setSelectedQuestion={setSelectedQuestion}
          selectedQuestion={selectedQuestion}
          previousQuestionRef={previousQuestionRef}
          lastQuestion={lastQuestionFlag}
          questionData={questionData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          scrollToItem={scrollToItem}
          />
    </div>

  );
}

export default Section