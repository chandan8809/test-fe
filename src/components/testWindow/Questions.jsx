import React, { useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useStopwatch } from 'react-timer-hook';
import { formatTime } from '../helper/MinTwoDigit';


const Questions = ({
    bigScreenView,
    questionData,
    selectedSection,
    setSelectedSection,
    selectedQuestion,
    setSelectedQuestion,
    setLastQuestion,
    selectedItem,
    setSelectedItem,
    containerRef,
    scrollToItem,
}) => {
    const {
        seconds,
        minutes,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

    const [selectedOption, setSelectedOption] = useState(null);

    const [timer, setTimer] = useState(0);
    const timerKey = 'timerValue';
    if(timer%5===0){
        console.log("timer",timer)
        selectedQuestion.timerVal=timer
    }

    console.log(",sdfkj",selectedItem)

    useEffect(() => {
        // Load the timer value from localStorage when the component mounts
        // const storedTimerValue = localStorage.getItem(timerKey);
        const storedTimerValue = selectedQuestion?.timerVal ? selectedQuestion?.timerVal :  0;
        console.log("timerStart",selectedQuestion)
       
        setTimer(parseInt(storedTimerValue));
        
       
    
        // Start the timer interval
        let intervalId = setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
    
        // Save the timer value in localStorage when the component unmounts
        return () => {
          clearInterval(intervalId);
        //   localStorage.setItem(timerKey, timer.toString());
        };
      }, [selectedQuestion]);

      function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
      }
      
      function padWithZero(number) {
        return number.toString().padStart(2, '0');
      }
      
    
    const handleRadioClick = (option) => {
        if (selectedOption === option) {
            // If the clicked option is already selected, clear the selection
            setSelectedOption(null);
        } else {
            // Otherwise, select the clicked option
            setSelectedOption(option);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setLastQuestion((prev)=>prev+1)
    };

    const handleClose = () => {
        setOpen(false);
    };

    

    useEffect(()=>{
        setSelectedOption(null)
        if(selectedQuestion.answerId){
            handleRadioClick(selectedQuestion.answerId)
        }

    },[selectedQuestion])

    console.log("sleec",selectedOption)

  return (
    <div className='flex-1'>

        <div ref={containerRef} className={`h-12 border-y-1.5  flex  items-center gap-2 bg-gray-50 shadow-sm overflow-auto  ${bigScreenView ?"w-full":"w-[370px]"}`}>
            {bigScreenView &&<div className="border-r pr-5 ">
            <p className="ml-5 text-sm">SECTION</p>
            </div>}
            {questionData.map((each,index)=>(
              <div 
               className={`scrollable-item ${selectedItem === index ? "selected" : ""} py-0.5 px-3 rounded-sm text-center  shrink-0 cursor-pointer ${selectedSection.name===each.name ? "bg-sky-600 text-white" : "hover:bg-gray-200"} `}
               onClick={()=>{
                setSelectedSection(each)
                setSelectedQuestion(each.questionList[0])
                setSelectedItem(index)
                scrollToItem(index)
               }}
               >
                {each.name}
              </div>
            ))}
        </div>

        <div>
            <div className={`h-12 border-y  flex  items-center gap-4  justify-between ${bigScreenView ?"px-5":"px-3.5"}`}>
            <div className=" pr-5 font-medium">
            {bigScreenView ? <p className=" text-sm">Question No. {selectedQuestion.id}</p>:<p className=" text-sm">Question No. {selectedQuestion.id}</p>} 
            </div>

            <div className="flex gap-3 items-center">
            <div>
                {bigScreenView && <p className="text-sm">Marks</p>}
                <div className="flex text-xs gap-0.5">
                <div className="bg-green-600 w-8 py-0.5 rounded-full text-center text-white font-bold">
                    +1
                </div>
                <div className="bg-red-700 w-8 py-0.5 rounded-full text-center text-white font-bold">
                    -0
                </div>
                </div>
            </div>
            <div>
                {bigScreenView && <p className="text-sm">Time</p>}
                <div className="flex text-sm gap-0.5 items-center">
                    {!bigScreenView && <AccessTimeIcon sx={{height:"20px"}}/>}
                    <div style={{fontSize: '15px'}}>
                     {/* <span>{formatTime(minutes)}</span>:<span>{formatTime(seconds) }</span> */}
                     <span>{formatTime(timer)}</span>
                    </div>
                </div>
            </div>
            </div>
        </div>

        <section className={`${bigScreenView ?'p-5':"p-3.5"}`}>
            <div className='Question '>{selectedQuestion.question}</div>
            <div className='Answer py-4'>
                <div>
                    {selectedQuestion.options.map((each,idx)=>(
                        <div className=' hover:bg-gray-100 p-2' for="html" onClick={() => handleRadioClick(each.value)}>
                            <input type="radio" name="radioOption" value={each.value} checked={selectedOption === each.value} />
                            <label for="html" className='ml-2'>{each.value}</label>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        <footer className='absolute w-full bottom-0 '>
            <div>
                <div className="h-[52px] border-2  flex  items-center gap-2 bg-gray-50 shadow-sm px-4">
                    <div 
                     className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer"
                     onClick={()=>{
                        if(selectedQuestion.id < selectedSection?.questionList.length){
                            setSelectedQuestion(selectedSection?.questionList[selectedQuestion.id])
                            if(selectedOption){
                                selectedQuestion.status="markedAndAnswered"
                                selectedQuestion.answerId=selectedOption
                            }
                            else{
                                selectedQuestion.status="marked"
                            }
                        }
                        if(selectedQuestion.id === selectedSection?.questionList.length){
                            console.log("hello",selectedQuestion)
                            if(selectedOption){
                                selectedQuestion.status="markedAndAnswered"
                                selectedQuestion.answerId=selectedOption
                               
                            }
                            else{
                                selectedQuestion.status="marked"
                            }
                            handleClickOpen()
                        }
                     }}
                     >
                    {bigScreenView ?"Mark for Review & Next":"Mark & Next"}
                    </div>

                    <div 
                     onClick={()=>setSelectedOption(null)}
                     className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer"
                     >
                    {bigScreenView ?"Clear Response":"Clear"}
                     
                    </div>

                    <div 
                     
                     className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer"
                     onClick={()=>{
                        if(selectedQuestion.id < selectedSection?.questionList.length){
                            setSelectedQuestion(selectedSection?.questionList[selectedQuestion.id])
                            if(selectedOption){
                                selectedQuestion.status="answerd"
                                selectedQuestion.answerId=selectedOption
                            }
                            else{
                                selectedQuestion.status="notAnswered"
                            }
                        }
                        if(selectedQuestion.id === selectedSection?.questionList.length){
                            console.log("hello",selectedQuestion)
                            if(selectedOption){
                                selectedQuestion.status="answerd"
                                selectedQuestion.answerId=selectedOption
                               
                            }
                            else{
                                selectedQuestion.status="notAnswered"
                            }
                            handleClickOpen()
                        }
                     }}
                     >
                     {bigScreenView ?"Save & Next":"Save & Next"}
                     
                    </div>
                </div>
            </div>
            
        </footer>

        <div>
        
         <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
               You have reached the last question of the section. Do you want to go to the first Question ?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={()=>{
                setSelectedQuestion(selectedSection.questionList[0])
                handleClose()
                }} 
                autoFocus>
                Yes
            </Button>
            </DialogActions>
        </Dialog>
        </div>
        

        </div>

    </div>

  )
}

export default Questions