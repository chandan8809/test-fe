import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepOrange, green, blue } from '@mui/material/colors';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import ModeStandbyOutlinedIcon from '@mui/icons-material/ModeStandbyOutlined';
import { examServiceObj } from '../../services/examServices';
import { useParams } from 'react-router-dom';

const Reports = () => {
  const [reportData,setReportData]=React.useState({})
  const {report_id}=useParams()



  React.useEffect(()=>{
   
    const getReportDetails=async()=>{
      const response = await examServiceObj.getReport({report_id})
      if(response.data){
        const data= response.data.report
        setReportData(data)
      }
      else{
        console.log("error")
      }
    }

    getReportDetails()

  },[])

  

  return (
    <div className='bg-gray-50 h-[100vh] pt-20'>
      <p className='max-w-screen-md mx-auto text-xl mb-3 font-semibold'>Overall Performance Summary</p>
      <div className='max-w-screen-md mx-auto flex   border justify-between p-5 bg-white shadow-md'>

        <div className='flex gap-4 items-center'>
          <Avatar sx={{ bgcolor: deepOrange[500],width: 50, height: 50 }}>
            < EmojiEventsOutlinedIcon/>
          </Avatar>
          <div>
            <div><span className='font-semibold'>{reportData.total_score}</span><span className='text-gray-500 text-sm font-semibold'> / {reportData.total_marks}</span></div>
            <div  className='text-gray-500 text-sm font-semibold'>Score</div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
        <Avatar sx={{ bgcolor: blue[500],width: 50, height: 50  }} >
          <AssignmentOutlinedIcon />
        </Avatar>
          <div>
            <div><span className='font-semibold'>--</span><span className='text-gray-500 text-sm font-semibold'> / 100</span></div>
            <div  className='text-gray-500 text-sm font-semibold'>Attempted</div>
          </div>
        </div>

        <div className='flex gap-4 items-center'>
        <Avatar sx={{ bgcolor: green[500],width: 50, height: 50  }} >
          <ModeStandbyOutlinedIcon />
        </Avatar>
          <div>
            <div><span className='font-semibold'>--</span><span className='text-gray-500 text-sm font-semibold'> / 100</span></div>
            <div  className='text-gray-500 text-sm font-semibold'>Accuracy</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Reports