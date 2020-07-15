import React from 'react'

const SideMenu = (props) => {
  return(
      <div className="side-menu">
        {props.children}
      </div>
  )
}

export default SideMenu
