import React from 'react'

const Header = (props) => {
  return(
    <>
      <div>Stand-in header</div>
      <ul>{props.children}</ul>
    </>
  )
}

export default Header
