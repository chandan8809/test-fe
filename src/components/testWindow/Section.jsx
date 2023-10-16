import React, { useState } from 'react'
import Questions from './Questions';
import QuestionPallet from './QuestionPallet';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';

const sectionList=[
    {name:"General Apptitiude", id:1},
    {name:"General Reasoning", id:2},
    {name:"English", id:3},
    {name:"Quantative App", id:4},
]

const Section = () => {
    const [showPallet,setShowPallet]=useState(true)
    const [selectedSection, setSelectedSection]=useState(sectionList[0])
    
    
  return (
    <div className='flex h-[calc(100vh-65px)] relative'>

         <section className={`absolute top-[calc(50vh-60px)] ${showPallet ? "right-[300px]" :"right-[0px]"}`}>
            <div 
             className='border border-gray-700 bg-gray-800 text-white h-[50px] flex items-center rounded-l-sm'
             onClick={()=>setShowPallet(!showPallet)}
             >
                {showPallet  ?<ArrowForwardIosIcon sx={{height:"15px",width:"15px"}}/> : <ArrowBackIosOutlinedIcon sx={{height:"15px",width:"15px"}}/>}
            </div>
        </section>

        <Questions sectionList={sectionList} selectedSection={selectedSection} setSelectedSection={setSelectedSection}/>
        <QuestionPallet showPallet={showPallet} selectedSection={selectedSection}/>
    </div>

  );
}

export default Section