import React from 'react'
import colors from '../colors'

const SideMenu = (props) => {
  return(
    <div
      className="side-menu"
      style={{height: '100%',
              width: props.vis ? '20%': '0%',
              marginRight: props.vis ? '0%' : '-20%',
              right: '0px',
              zIndex: 1,
              backgroundColor: colors.white,
              position: 'absolute',
              padding: '10px',

            }}
    >
      <div
        style={{
          backgroundColor: colors.green,
          color: colors.white,
          borderRadius: '10px',
          textAlign: 'center',
          padding: '10px',
          height: '20px',
          width: '160px',
          margin: 'auto'
        }}
      >Schedule Game</div>
    </div>
  )
}

export default SideMenu
