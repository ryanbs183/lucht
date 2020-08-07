import React from 'react'
import icon from './lucht-icon.png'
const aboutStyle={height: '25px', marginLeft: '10px', marginRight: '10px'}

const AboutPage = () => {
  return(
    <div className="info-page">
      <a id='abt-icon'><img src={icon} className='accent-logo'/></a>
      <p> <br/><br/>Hello! This is lucht an app to help you find any local pickup sports games (and in the future book a referee!). </p>
      <p> lucht was made in the hopes of bringing people together, this is why the word lucht, (the Irish word for community) was picked to represent this project</p>
      <p> If you have any bugs to report, cool ideas, or know how to write an about page, please email me at <a href="mailto:ryanbakersullivan@gmail.com">ryanbakersullivan@gmail.com</a></p>
      <p> Hope you enjoy! </p>
    </div>
  )
}

export default AboutPage
