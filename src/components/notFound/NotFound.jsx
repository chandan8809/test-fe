import React from 'react'
import Lottie from 'react-lottie-player'
import animationData from "../../assets/pageNotFound.json";
import {  Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
    <Link to="/">
        <Lottie
            animationData={animationData}
            loop={false}
            play
            style={{ width:"100%", height: "100dvh" }}
        />
    </Link>
    </div>

  )
}

export default NotFound