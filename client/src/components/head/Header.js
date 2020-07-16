import React from 'react'
import {ReactComponent as Logo} from './apiary.svg'

const Header = (props) => {
  return(
    <div className="banner">
      <div className='header'>
        <div className='header-logo'><h1><Logo style={{height: '40px', width:'40px', marginRight: '10px'}}/>LUCHT</h1></div>
        <ul className='header-link-list'>{props.children}</ul>
      </div>
    </div>
  )
}

export default Header
