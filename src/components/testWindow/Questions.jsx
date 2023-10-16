import React, { useState } from 'react'
import Countdown from 'react-countdown';



const Questions = ({sectionList,selectedSection,setSelectedSection}) => {
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
  return (
    <div className='flex-1'>
        <div className="h-12 border-y-1.5  flex  items-center gap-2 bg-gray-50 shadow-sm">
            <div className="border-r pr-5 ">
            <p className="ml-5 text-sm">SECTION</p>
            </div>
            {sectionList.map(each=>(
              <div 
               className={`py-0.5 px-3 rounded-sm text-center cursor-pointer ${selectedSection.name===each.name ? "bg-sky-600 text-white" : "hover:bg-gray-200"} `}
               onClick={()=>setSelectedSection(each)}
               >
                {each.name}
              </div>
            ))}
            
        </div>
        <div>
            <div className="h-12 border-y  flex  items-center gap-4  justify-between px-5">
            <div className=" pr-5 font-medium">
            <p className=" text-sm">Question No. 1</p>
            </div>

            <div className="flex gap-3">
            <div>
                <p className="text-sm">Marks</p>
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
                <p className="text-sm">Time</p>
                <div className="flex text-sm gap-0.5">
                <Countdown
                    date={Date.now() + 1000000}
                   
                />
                </div>
            </div>
            </div>
        </div>

        <section className='p-5'>
            <div className='Question '> if X:Y = 9:5 ; then find the value of X and Y ?</div>
            <div className='Answer py-4'>
                {/* <FormControl>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                >
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                    <FormControlLabel value="other" control={<Radio />} label="Other" />
                    <FormControlLabel value="heli" control={<Radio />} label="Trans" />
                </RadioGroup>
                </FormControl> */}
                <div>

                    <div className=' hover:bg-gray-100 p-2' for="html" onClick={() => handleRadioClick('Option 1')}>
                        <input type="radio" name="radioOption" value="Option 1" checked={selectedOption === 'Option 1'} />
                        <label for="html" className='ml-2'>HTML</label>
                    </div>

                    <div className=' hover:bg-gray-100 p-2' onClick={() => handleRadioClick('Option 2')}>
                    <input type="radio" name="radioOption" value="Option 2" checked={selectedOption === 'Option 2'} />
                          <label for="css" className='ml-2'>CSS</label>
                    </div>
                    <div className=' hover:bg-gray-100 p-2' onClick={() => handleRadioClick('Option 3')}>
                    <input type="radio" name="radioOption" value="Option 3" checked={selectedOption === 'Option 3'} />
                          <label for="css" className='ml-2'>Javascript</label>
                    </div>
                   

        
                    
                </div>

            </div>

            
            
        </section>

        <footer className='absolute w-full bottom-0 z-[-10]'>
            <div>
                <div className="h-[52px] border-2  flex  items-center gap-2 bg-gray-50 shadow-sm px-4">
                    <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                    Mark for Review & Next
                    </div>
                    <div className="p-1 rounded-sm bg-sky-300  text-center px-4 cursor-pointer">
                    Clear Response
                    </div>
                </div>
            </div>
            
        </footer>
        

        </div>

    </div>

  )
}

export default Questions