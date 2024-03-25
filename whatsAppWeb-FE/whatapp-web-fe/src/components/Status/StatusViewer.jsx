import React, { useEffect, useState } from 'react'
import stories from './DummyStories'
import ProgressBar from './ProgressBar';
import { BsArrowLeft } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const StatusViewer = () => {
    const [currentStoryIndex,setCurrentStoryIndex] = useState(0);
    const [activeIndex,setActiveIndex] = useState(0);
    const navigate = useNavigate();

    const handleNextStory = () => {
        if(currentStoryIndex < stories?.length-1){
            setCurrentStoryIndex(currentStoryIndex+1)
            setActiveIndex(activeIndex+1)
        }else{
            setCurrentStoryIndex(0)
            setActiveIndex(0)
        }
    }

    const handleNavigate = ()=> {
        navigate(-1);
    }
    useEffect(() => {    
        const intervalId = setInterval(() => {
            handleNextStory();
        } , 2000 );

        return () => clearInterval(intervalId)
    } , [currentStoryIndex]);          //called evrytime whenever the currentIndex changes

  return (
    <div>
      <div className='relative flex justify-center items-center h-[100vh] bg-slate-900'>
        <div className='relative'>
            <img className='max-h-[96vh] object-contain'
             src={ stories?.[currentStoryIndex].image} alt="" />
             <div className='absolute top-0 flex w-full'>
                {/* no od stories = progressBar */}
                {stories.map((item,index)=><ProgressBar key={index} duration={2000} index={index} activeIndex={activeIndex}/> )}
             </div>
        </div>

        <div>
            <BsArrowLeft onClick={handleNavigate} className='cursor-pointer text-white text-2xl absolute top-7 left-10'/>
            <AiOutlineClose onClick={handleNavigate} className='cursor-pointer text-white text-2xl absolute top-7 right-10'/>
        </div>
      </div>
    </div>
  )
}

export default StatusViewer
