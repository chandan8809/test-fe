import React from 'react'
import Avatar from '@mui/material/Avatar';
import { lightBlue ,green } from '@mui/material/colors';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useAuth } from '../../contexts/UserContext';
import { examServiceObj } from '../../services/examServices';
import { useNavigate, useParams } from 'react-router-dom';

const questionStatus={
    "answerd":"rounded-t-full bg-green-600  text-white",
    "marked":"rounded-full bg-purple-600  text-white",
    "notVisited":3,
    "markedAndAnswered":"rounded-full bg-purple-600  text-white ",
    "notAnswered":"rounded-b-full bg-red-700  text-white"
  }

const questionStatusSelected={
    "answerd":"rounded-full bg-green-600  text-white",
    "marked":"rounded-full bg-purple-600  text-white",
    "notVisited":3,
    "markedAndAnswered":"rounded-full bg-purple-600  text-white ",
    "notAnswered":"rounded-full bg-red-700  text-white"
  }

const QuestionPallet = ({
    showPallet,
    selectedSection,
    setSelectedQuestion, 
    selectedQuestion,
    previousQuestionRef,
    lastQuestion,
    bigScreenView,
    dialog, //mobile
    questionData,
    selectedItem,
    setSelectedItem,
    setSelectedSection,
    scrollToItem,
    attemptedAnswer,
    questionStatusObj,
    setQuestionStatus
}) => {
    const { userData } = useAuth()
    const [open, setOpen] = React.useState(false);
    let { exam_id } = useParams();
    const handleClickOpen = () => {
      setOpen(true);
    };
    const navigate=useNavigate()
  
    const handleClose = () => {
      setOpen(false);
    };
    const statesCountFun=()=>{
        const questionLists = questionStatusObj[selectedSection.section_name]

        let count={
            notVisited:0,
            answerd:0,
            marked:0,
            markedAndAnswered:0,
            notAnswered:0
        }
      
        questionLists?.forEach(each=>{
            if(each.status==="notVisited"){
              count.notVisited++
            }
           else if(each.status==="answerd"){
             count.answerd++
           }
           else if(each.status==="marked"){
             count.marked++
           }
           else if(each.status==="markedAndAnswered"){
             count.markedAndAnswered++
           }  
           else if(each.status==="notAnswered"){
             count.notAnswered++
           }  

        })
        return count
    }

    const count=statesCountFun()

    const submitTest=async()=>{
        const response= await examServiceObj.submitTest({attempted:attemptedAnswer,quiz_id:exam_id})
        if(response.data){
            const data= response.data
            navigate(`/result/${data.report_id}`)
        }
        else{
            console.log("error")
        }
    }

    // let originalOptions=selectedQuestion.options

    // const convertedOptions = Object.keys(originalOptions).map(key => {
    //     return {
    //         id: parseInt(key),
    //         value: originalOptions[key]
    //     };
    // });
    const calculateTotals = (category) => {
        const totalQuestion = questionStatusObj[category].length
        const answered = questionStatusObj[category].filter((status) => status.status === 'answerd').length;
        const notAnswerdCount = questionStatusObj[category].filter((status) => status.status === 'notAnswerd').length;
        const marked = questionStatusObj[category].filter((status) => status.status === 'marked').length;
        const markedAndAnswed = questionStatusObj[category].filter((status) => status.status === 'markedAndAnswered').length;
        const notVisitedCount= questionStatusObj[category].filter((status) => status.status === 'notVisited').length;
        const answeredCount=answered+markedAndAnswed
        const markedCount=marked+markedAndAnswed
        return { totalQuestion, answeredCount,notAnswerdCount,markedCount, notVisitedCount };
    };

    const renderTable=()=>{
        return (
             <>
                {Object.keys(questionStatusObj).map((category) => (
                    <tr key={category}>
                    <td className='capitalize'>{category}</td>
                    <td className='text-center'>{calculateTotals(category).totalQuestion}</td>
                    <td className='text-center'>{calculateTotals(category).answeredCount}</td>
                    <td className='text-center'>{calculateTotals(category).notAnswerdCount}</td>
                    <td className='text-center'>{calculateTotals(category).markedCount}</td>
                    <td className='text-center'>{calculateTotals(category).notVisitedCount}</td>
                    </tr>
                ))}
             </>
        );
    }


    if(!dialog && Object.entries(questionStatusObj).length>0){
        return (
            <>
            {showPallet && bigScreenView &&<div className='bg-sky-100 border w-[300px] relative z-[10]'>
                <section className='border-b border-gray-300 col-span-1 px-3 py-2 '>
                    <div className='flex items-center gap-2'>
        
                        <Avatar sx={{ bgcolor: lightBlue[500],height:"30px",width:"30px" }} >
                            < PersonRoundedIcon />
                        </Avatar>
                        <p className='capitalize'>{userData.user.name}</p>
                        
                    </div>
                </section>
        
                <section className='border-b border-gray-300 py-2 col-span-1 px-3 pt-1'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-0.5'>
                            <div className='border h-6 w-6 flex justify-center items-center text-xs font-bold rounded-t-full bg-green-600  text-white '>
                             {count.answerd}
                            </div>
                            <p className='text-xs '>Answered</p>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <div className='border h-6 w-6 flex justify-center items-center text-xs font-bold rounded-full bg-purple-600  text-white '>
                                {count.marked}
                            </div>
                            <p className='text-xs'>Marked</p>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <div className='border border-black h-6 w-6  bg-white flex justify-center items-center text-xs font-bold'>
                            {count.notVisited}
                            </div>
                            <p className='text-xs '>Not Visited</p>
                        </div>
        
                        
                    </div>
         
                    <div className='flex items-center justify-between pt-2'>
                        <div className='flex items-center gap-0.5 relative'>
                            <div className='absolute top-[-12px] left-[10px]'>
                            < CheckRoundedIcon sx={{color: green[700],height:"15px",width:"15px" , strokeWidth: 4, stroke: green[500],}} className='font-bold'/>
                            </div>
                            <div className='border h-6 w-6 flex justify-center text-xs font-bold items-center rounded-full bg-purple-600  text-white '>
                                {count.markedAndAnswered}
                            </div>
                        
                           
                            <p className='text-xs '>Marked and answered</p>
                        </div>
                        <div className='flex items-center gap-0.5'>
                            <div className='border h-6 w-6 flex justify-center text-xs font-bold items-center rounded-b-full bg-red-700  text-white '>
                                {count.notAnswered}
                            </div>
                            <p className='text-xs '>Not Answered</p>
                        </div>
                    </div>
                </section>
        
                <section className='section pt-8'>
                    <div className='flex bg-sky-200 px-2 py-0.5 text-md'>
                        <div className=' text-md font-medium' >
                            <p>SECTION : </p>
                        </div>
                        <div className='capitalize'>
                         &nbsp;{Object.entries(questionStatusObj)[selectedSection.id-1][0]}
                        </div>
                    </div>
        
                   <div className={`flex flex-wrap gap-3 p-4 overflow-scroll  ${dialog ?"h-[calc(100dvh-292px)]": "h-[calc(100vh-355px)]"} `}>
                        {Object.entries(questionStatusObj)[selectedSection.id-1][1].map((each)=>{
                            return(
                                <div 
                                 key={each.index}
                                 className={`
                                  relative h-7 w-10  flex justify-center items-center font-medium cursor-pointer  
                                  ${(each.status!=="notVisited" && each.index===selectedQuestion.id) ? questionStatusSelected[each.status] 
                                    : 
                                    each.status!=="notVisited" ?  questionStatus[each.status] 
                                    : 
                                    each.index===selectedQuestion.id ? "border border-black bg-white text-black rounded-full": "border border-black bg-white"
                                  }`}
                                 onClick={()=>{
                                   
                                    let curr_ques= Object.entries(questionStatusObj)[selectedSection.id-1][1].find(ques=>ques.index===selectedQuestion.id)
                                    previousQuestionRef.current = curr_ques
                                    if(previousQuestionRef.current.status==="notVisited"){
                                        previousQuestionRef.current.status = "notAnswered"
                                        setQuestionStatus((prevStatus) => {
                                            const updatedStatus = { ...prevStatus };
                                            updatedStatus[selectedSection.section_name] = prevStatus[selectedSection.section_name].map((stat, idx) => {
                                              if (selectedQuestion.id === idx + 1) {
                                                return {status:"notAnswered",index:idx+1};
                                              }
                                              return stat;
                                            });
                                            return updatedStatus;
                                        });
                                    }
                                   
                                    let ques=selectedSection.question_list.find(ques=> ques.id===each.index)
                                    setTimeout(()=>{
                                        setSelectedQuestion(ques)
                                    },0)
                                }} 
                                >
                                    {each.status==="markedAndAnswered" && <div className='absolute top-[-10px] left-[22px]'>
                                    < CheckRoundedIcon sx={{color: green[700],height:"18px",width:"18px" , strokeWidth: 4, stroke: green[500],}} className='font-bold'/>
                                    </div>}
                                    {each.index}
                                </div>
                            )
                        })}
                   </div>
                </section>
        
                <section>
                    <div className=' border border-gray-300 py-4 px-2'>
                        <div className="h-12   flex  items-center gap-2 shadow-sm px-2 justify-between ">
                            <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                             Question Paper
                            </div>
                            <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                             Instruction
                            </div>
                        </div>
                       <div className='px-2'>
                           <div onClick={handleClickOpen} className="p-1 rounded-sm bg-sky-700  text-center px-2 cursor-pointer text-white">
                             Submit Test
                            </div>
        
                       </div>
                    </div>
        
                </section>
                <div>
                <Dialog  
                    maxWidth={"lg"}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title" style={{textAlign:"center"}}>
                    {"Submit your test"}
                    </DialogTitle>
                    <DialogContent>

                    <table>
                    <tr className='bg-sky-500'>
                        <th>Section</th>
                        <th>No. of questions</th>
                        <th>Answered</th>
                        <th>Not Answered</th>
                        <th>Marked for Review</th>
                        <th>Not Visited</th>
                    </tr>
                    {renderTable()}
                    </table>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={submitTest}>
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                </div>
        
            </div>}
            </>
          )

    }
   


    if(dialog){
        return (
          <>
          {showPallet && bigScreenView &&<div className='bg-sky-100 border w-[300px] relative z-[10]'>
              <section className='border-b border-gray-300 col-span-1 px-3 py-2 '>
                  <div className='flex items-center gap-2'>
      
                      <Avatar sx={{ bgcolor: lightBlue[500],height:"30px",width:"30px" }} >
                          < PersonRoundedIcon />
                      </Avatar>
                      {/* <p>{userData}</p> */}
                      
                  </div>
              </section>
      
              <section className='border-b border-gray-300 py-2 col-span-1 px-3 pt-1'>
                  <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-0.5'>
                          <div className='border h-6 w-6 flex justify-center items-center text-xs font-bold rounded-t-full bg-green-600  text-white '>
                              {count.answerd}
                          </div>
                          <p className='text-xs '>Answered</p>
                      </div>
                      <div className='flex items-center gap-0.5'>
                          <div className='border h-6 w-6 flex justify-center items-center text-xs font-bold rounded-full bg-purple-600  text-white '>
                              {count.marked}
                          </div>
                          <p className='text-xs'>Marked</p>
                      </div>
                      <div className='flex items-center gap-0.5'>
                          <div className='border border-black h-6 w-6  bg-white flex justify-center items-center text-xs font-bold'>
                              {count.notVisited}
                          </div>
                          <p className='text-xs '>Not Visited</p>
                      </div>
                  </div>
       
                  <div className='flex items-center justify-between pt-2'>
                      <div className='flex items-center gap-0.5 relative'>
                          <div className='absolute top-[-12px] left-[10px]'>
                          < CheckRoundedIcon sx={{color: green[700],height:"15px",width:"15px" , strokeWidth: 4, stroke: green[500],}} className='font-bold'/>
                          </div>
                          <div className='border h-6 w-6 flex justify-center text-xs font-bold items-center rounded-full bg-purple-600  text-white '>
                              {count.markedAndAnswered}
                          </div>
                      
                         
                          <p className='text-xs '>Marked and answered</p>
                      </div>
                      <div className='flex items-center gap-0.5'>
                          <div className='border h-6 w-6 flex justify-center text-xs font-bold items-center rounded-b-full bg-red-700  text-white '>
                              {count.notAnswered}
                          </div>
                          <p className='text-xs '>Not Answered</p>
                      </div>
                  </div>
              </section>
             
             {questionData.map((section,idx)=>(
                <div key={section._id}>
                    <section className='section pt-8'>
                        <div className='flex bg-sky-200 px-2 py-0.5 text-md'>
                            <div className=' text-md font-medium' >
                                <p>SECTION : </p>
                            </div>
                            <div className='capitalize'>
                            &nbsp;{section?.section_name}
                            </div>
                        </div>
            
                        <div className={`flex flex-wrap gap-3 p-4 overflow-scroll `}>
                            {section.question_list.map((each)=>{
                                // const targetQuestion=selectedSection.questionList.find((ques)=>ques._id===selectedQuestion._id)
                                // selectedQuestion.status="notVisited"
                                // if( targetQuestion){
                                //     targetQuestion.status="notVisited"
                                // }
                                
                                return(
                                    <div 
                                    key={each._id}
                                    className={`
                                        relative h-7 w-10  flex justify-center items-center font-medium cursor-pointer  
                                        ${(each.status && each._id===selectedQuestion._id) 
                                        ? 
                                        questionStatusSelected[each.status] 
                                        : 
                                        each.status 
                                        ?  
                                        questionStatus[each.status] 
                                        : 
                                        each._id===selectedQuestion._id
                                        ? 
                                        "border border-black bg-white text-black rounded-full"
                                        : 
                                        "border border-black bg-white"
                                        }`}
                                    onClick={()=>{
                                        previousQuestionRef.current = selectedQuestion
                                        if(!previousQuestionRef.current.status){
                                            previousQuestionRef.current.status = "notAnswered"
                                        }
                                        setSelectedQuestion(each)
                                        setSelectedItem(idx)
                                        scrollToItem(idx)
                                        setSelectedSection(section)
                                    }} 
                                    >
                                        {each.status==="markedAndAnswered" && <div className='absolute top-[-10px] left-[22px]'>
                                        < CheckRoundedIcon sx={{color: green[700],height:"18px",width:"18px" , strokeWidth: 4, stroke: green[500],}} className='font-bold'/>
                                        </div>}
                                        {each.id}
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                </div>
             ))}

      
              <section>
                  <div className=' border border-gray-300 py-4 px-2'>
                      <div className="h-12   flex  items-center gap-2 shadow-sm px-2 justify-between ">
                          <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                           Question Paper
                          </div>
                          <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                           Instruction
                          </div>
                      </div>
                     <div className='px-2'>
                         <div className="p-1 rounded-sm bg-sky-700  text-center px-2 cursor-pointer text-white">
                           Submit Test
                          </div>
      
                     </div>
                  </div>
      
              </section>
      
          </div>}
          </>
        )
    }
 
}

export default QuestionPallet