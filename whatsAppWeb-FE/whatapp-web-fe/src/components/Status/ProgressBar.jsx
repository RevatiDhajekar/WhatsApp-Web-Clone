import React, { useEffect, useState } from 'react'
import "../../css/ProgressBar.css";

const ProgressBar = ({index,activeIndex , duration}) => {

    const isActive = index === activeIndex;
    const [progress , setProgress] = useState();

    useEffect(() => {
        const intervalId = setInterval(() => {
            setProgress((prev) => {
                if(prev<100){
                    return prev+1;
                }
                clearInterval(intervalId);
            })
        } , duration/100)
    } , [duration ,activeIndex]);

    useEffect(() => {
        setProgress(0)
    } , [activeIndex]);   //activeIndex will change on story change

  return (
    <div className={`progress-bar-container ${isActive ? "active" : ""}`}>
      <div className={`${isActive ? "progress-bar" : ""}`}
      style={{width:`${progress}%`}}
      >
       
      </div>
    </div>
  )
}

export default ProgressBar
