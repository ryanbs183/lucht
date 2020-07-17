import React, {useState} from 'react'
import { CSSTransition } from 'react-transition-group'
import Home from './components/home/Home'
import About from './components/abt/About'
import GitHub from './components/git/GitHub'
import Header from './components/head/Header'
import LuchtMap from './components/map/LuchtMap'
import PopUpMenu from './components/map/PopUpMenu'

const Lucht = () => {
  const [popupVis, setPopVis] = useState(false)
  return (
    <div className="Pyckup">
      <Header>
        <Home />
        <About />
        <GitHub />
      </Header>
      <LuchtMap
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        setPopVis={setPopVis}
      />
      <CSSTransition
        in={popupVis}
        timeout={400}
        classNames="popup-menu"
        unmountOnExit
        appear={true}
      >
        <PopUpMenu/>
      </CSSTransition>
      <CSSTransition
        in={popupVis}
        timeout={400}
        classNames="shadow"
        unmountOnExit
        appear={true}
      >
        <div className="shadow" onClick={(e) => {setPopVis(false)}}></div>
      </CSSTransition>
    </div>
  );
}

export default Lucht;
