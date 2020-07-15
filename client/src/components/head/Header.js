import React from 'react'

const Header = (props) => {
  return(
    <div className='header'>
      <div>Stand-in header</div>
      <ul>{props.children.join(' ')}</ul>
    </div>
  )
}

export default Header
