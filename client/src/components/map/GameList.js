import React, {useState, useEffect} from 'react'
import { CSSTransition } from 'react-transition-group'

const GameList = (props) => {
  const [show,setShow] = useState(false)

  useEffect(() => {
    if((typeof props.children) !== undefined){
      setShow(true)
    }
    else{
      setShow(false)
    }
  }, [props.children])
  return (
    <CSSTransition
      in={show}
      timeout={400}
      classNames="game-list"
      unmountOnExit
      appear={true}
    >
      <div className="game-list">
        {props.children}
      </div>
    </CSSTransition>)
}

export default GameList
