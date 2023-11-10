import React, { useEffect, useState } from 'react'
import Header from './Header'
import Section from './Section'
import useMediaQuery from '@mui/material/useMediaQuery';
import MobileHeader from './MobileHeader';
import { examServiceObj } from '../../services/examServices';
import { useParams } from 'react-router-dom';

const MainWindow = () => {
  const bigScreenView = useMediaQuery('(min-width:600px)');
  const [loadingBtn,setLoadingBtn]=useState(false)
  const [questionData,setQuestionData]=useState([])
  const [state, setState] = React.useState({
    right: false,
  });
  let { exam_id } = useParams();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);

 useEffect(()=>{
  const onExamStart= async(examId)=>{
    setLoadingBtn(true)
    const response= await examServiceObj.startExam({exam_id:examId})
    if(response.data){
      const data= response.data
      const sectionList=data.quiz.section_list
      sectionList.forEach((section, sectionIndex) => {
        section.id = sectionIndex+1; // Set section ID
        
        // Add IDs to question_list in each section
        section.question_list.forEach((question, questionIndex) => {
          question.id = questionIndex+1; // Set question ID
        });
      });
      setQuestionData(sectionList)
    }
    else{
      console.log("error")
    }
    setLoadingBtn(false)
  }
 
  if(exam_id){
    onExamStart(exam_id)
  
  }
 },[exam_id])
 

  if(questionData.length===0){
    return <div></div>
  }

  return (
    <div>
        {bigScreenView && <Header expiryTimestamp={time}/>}
        {!bigScreenView && <MobileHeader expiryTimestamp={time} toggleDrawer={toggleDrawer}/>}
        <Section bigScreenView={bigScreenView} state={state} toggleDrawer={toggleDrawer} questionData={questionData}/>
    </div>
  )
}

export default MainWindow