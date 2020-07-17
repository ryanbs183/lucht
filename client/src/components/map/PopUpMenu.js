import React from 'react'
import { CSSTransition } from 'react-transition-group'

const PopUpMenu = () => {
  return(
    <div className='popup-menu'>
      <span className='menu-title'><b>TEST</b></span>
      <form>
        <ul>
          <input type="date"/>
          <input type="number" placeHolder="Players"/>
        </ul>
        <div className="menu-button"><b>Submit</b></div>
      </form>
    </div>
  )
}

export default PopUpMenu
