import React from 'react'
import Avatar from '@mui/material/Avatar';
import { lightBlue ,green } from '@mui/material/colors';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const QuestionPallet = ({showPallet,selectedSection}) => {
    const array = new Array(100).fill(undefined);
  return (
    <>
    {showPallet &&<div className='bg-sky-100 border w-[300px]'>
        <section className='border-b border-gray-300 col-span-1 px-3 py-2 '>
            <div className='flex items-center gap-2'>

                <Avatar sx={{ bgcolor: lightBlue[500],height:"30px",width:"30px" }} >
                    < PersonRoundedIcon />
                </Avatar>
                <p>Chandna Kumar</p>
                
            </div>
        </section>

        <section className='border-b border-gray-300 py-2 col-span-1 px-3 pt-1'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-0.5'>
                    <div className='border h-6 w-6 rounded-t-full bg-green-600 flex justify-center items-center text-white text-xs font-bold'>
                        0
                    </div>
                    <p className='text-xs '>Answered</p>
                </div>
                <div className='flex items-center gap-0.5'>
                    <div className='border h-6 w-6 rounded-full bg-purple-600 flex justify-center items-center text-white text-xs font-bold'>
                        0
                    </div>
                    <p className='text-xs'>Marked</p>
                </div>
                <div className='flex items-center gap-0.5'>
                    <div className='border border-black h-6 w-6  bg-white flex justify-center items-center text-xs font-bold'>
                        0
                    </div>
                    <p className='text-xs '>Not Visited</p>
                </div>

                
            </div>
 
            <div className='flex items-center justify-between pt-2'>
                <div className='flex items-center gap-0.5 relative'>
                    <div className='absolute top-[-12px] left-[10px]'>
                    < CheckRoundedIcon sx={{color: green[700],height:"15px",width:"15px" , strokeWidth: 4, stroke: green[500],}} className='font-bold'/>
                    </div>
                    <div className='border h-6 w-6 rounded-full bg-purple-600 flex justify-center items-center text-white text-xs font-bold'>
                        10
                    </div>
                
                   
                    <p className='text-xs '>Marked and answered</p>
                </div>
                <div className='flex items-center gap-0.5'>
                    <div className='border h-6 w-6 rounded-b-full bg-red-700 flex justify-center items-center text-white text-xs font-bold'>
                        0
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
                <div>
                 &nbsp;{selectedSection?.name}
                </div>
            </div>

           <div className='flex flex-wrap gap-3 p-4 h-[calc(100vh-355px)] overflow-scroll'>
                {array.map((each,idx)=>{
                    return(
                        <div>
                             <div className='flex items-center gap-0.5'>
                                <div className='border border-black h-7 w-10  bg-white flex justify-center items-center font-medium'>
                                    {idx+1}
                                </div>
                            </div>

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

export default QuestionPallet