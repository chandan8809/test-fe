import React, { useRef, useState } from 'react'
import Countdown from 'react-countdown';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';



const Questions = ({
    matches,
    questionData,
    selectedSection,
    setSelectedSection,
    selectedQuestion,
    setSelectedQuestion,
    setLastQuestion
}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    

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

    const containerRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
  
    const scrollToItem = (itemIndex) => {
      const item = containerRef.current.children[itemIndex];
      item.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    };

  return (
    <div className='flex-1'>

        <div ref={containerRef} className={`h-12 border-y-1.5  flex  items-center gap-2 bg-gray-50 shadow-sm overflow-auto  ${matches ?"w-full":"w-[370px]"}`}>
            {matches &&<div className="border-r pr-5 ">
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
            <div className="h-12 border-y  flex  items-center gap-4  justify-between px-5">
            <div className=" pr-5 font-medium">
            {matches ? <p className=" text-sm">Question No. {selectedQuestion.id}</p>:<p className=" text-sm">{selectedQuestion.id}</p>} 
            </div>

            <div className="flex gap-3 items-center">
            <div>
                {matches && <p className="text-sm">Marks</p>}
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
                {matches && <p className="text-sm">Time</p>}
                <div className="flex text-sm gap-0.5">
                <Countdown
                    date={Date.now() + 1000000}
                />
                </div>
            </div>
            </div>
        </div>

        <section className='p-5'>
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
                                setSelectedOption(null)
                            }
                            else{
                                selectedQuestion.status="marked"
                            }
                        }
                        if(selectedQuestion.id === selectedSection?.questionList.length){
                            console.log("hello",selectedQuestion)
                            if(selectedOption){
                                selectedQuestion.status="markedAndAnswered"
                                setSelectedOption(null)
                            }
                            else{
                                selectedQuestion.status="marked"
                            }
                            handleClickOpen()
                        }
                     }}
                     >
                    {matches ?"Mark for Review & Next":"Mark & Next"}
                    </div>

                    <div 
                     onClick={()=>setSelectedOption(null)}
                     className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer"
                     >
                    {matches ?"Clear Response":"Clear"}
                     
                    </div>

                    <div 
                     
                     className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer"
                     onClick={()=>{
                        if(selectedQuestion.id < selectedSection?.questionList.length){
                            setSelectedQuestion(selectedSection?.questionList[selectedQuestion.id])
                            if(selectedOption){
                                selectedQuestion.status="answerd"
                                setSelectedOption(null)
                            }
                            else{
                                selectedQuestion.status="notAnswered"
                            }
                        }
                        if(selectedQuestion.id === selectedSection?.questionList.length){
                            console.log("hello",selectedQuestion)
                            if(selectedOption){
                                selectedQuestion.status="answerd"
                                setSelectedOption(null)
                            }
                            else{
                                selectedQuestion.status="notAnswered"
                            }
                            handleClickOpen()
                        }
                     }}
                     >
                     {matches ?"Save & Next":"Save & Next"}
                     
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
            <DialogTitle id="alert-dialog-title">
            {" Last Question"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
               You moved to the last Question, Do you want to move to first Question ?
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