import React from 'react'
//import {ReactComponent as Logo} from './lucht-header.svg'
import logo from './lucht-header.png'
import icon from './lucht-icon.png'
const Header = (props) => {
  return(
    <div className="banner">
      <div className='header'>
        <div className='header-logo'><img src={logo} style={{height: '40px', marginTop: '10%'}}></img></div>
        <ul className='header-link-list'>{props.children}</ul>
      </div>
    </div>
  )
}

export default Header
