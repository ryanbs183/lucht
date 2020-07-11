import React from 'react'

const SideMenu = (props) => {
  return(
    <div
      className="side-menu"
      style={{height: '100%',
              width: '20%',
              visibility: props.vis ? 'visible' : 'hidden',
              right: '0px',
              position: 'absolute'
            }}
    >
      Stand in for side menu
    </div>
  )
}

export default SideMenu
