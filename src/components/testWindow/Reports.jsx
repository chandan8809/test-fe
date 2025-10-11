import * as React from 'react';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { examServiceObj } from '../../services/examServices';
import { useParams } from 'react-router-dom';

const Reports = () => {
  const [sectionData,setSectionData]=React.useState({})
  const {report_id}=useParams()

  React.useEffect(()=>{
    const getReportDetails=async()=>{
      const response = await examServiceObj.getReport({report_id})
      if(response.data){
        const data= response.data.report.section_mark
        setSectionData(data)
      }
      else{
        console.log("error")
      }
    }

    getReportDetails()

  },[])

  const totalMarks = Object.values(sectionData).reduce((sum, section) => sum + section.section_marks, 0);
  const totalPossible = Object.values(sectionData).reduce((sum, section) => sum + section.section_total_marks, 0);

  return (
     

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Exam Results</h1>
          <p className="text-gray-600">Your performance across different sections</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">Total Score</h2>
              <p className="text-gray-500">Overall performance</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-gray-800">{totalMarks}/{totalPossible}</div>
              <div className="text-sm text-gray-500">{((totalMarks / totalPossible) * 100).toFixed(1)}%</div>
            </div>
          </div>
          <div className="mt-4 bg-gray-200 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
              style={{ width: `${(totalMarks / totalPossible) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(sectionData).map(([sectionName, data]) => {
            const Icon = AssignmentOutlinedIcon;
            const percentage = (data.section_marks / data.section_total_marks) * 100;
            
            return (
              <div key={sectionName} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`bg-blue-300 p-3 rounded-lg`}>
                      <AssignmentOutlinedIcon />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{sectionName}</h3>
                      <p className="text-sm text-gray-500">Section Score</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {data.section_marks}/{data.section_total_marks}
                    </div>
                    <div className="text-sm text-gray-500">{percentage.toFixed(0)}%</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className={`bg-green-500 h-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3 text-center">
                  {percentage === 0 && (
                    <span className="text-sm text-red-500 font-medium">Need Improvement</span>
                  )}
                  {percentage > 0 && percentage < 50 && (
                    <span className="text-sm text-orange-500 font-medium">Below Average</span>
                  )}
                  {percentage >= 50 && percentage < 75 && (
                    <span className="text-sm text-yellow-500 font-medium">Good</span>
                  )}
                  {percentage >= 75 && percentage < 100 && (
                    <span className="text-sm text-blue-500 font-medium">Very Good</span>
                  )}
                  {percentage === 100 && (
                    <span className="text-sm text-green-500 font-medium">Excellent</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Reports
