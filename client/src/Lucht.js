import React, {useState} from 'react'
import { CSSTransition } from 'react-transition-group'
import Home from './components/home/Home'
import About from './components/abt/About'
import GitHub from './components/git/GitHub'
import Header from './components/head/Header'
import LuchtMap from './components/map/LuchtMap'
import AboutPage from './info/AboutPage'

const Lucht = () => {
  const [popupScheduleVis, setPopScheduleVis] = useState(false)
  const [popupJoinVis, setPopJoinVis] = useState(false)
  return (
    <div className="Pyckup">
      <Header>
        <Home />
        <About />
        <GitHub />
      </Header>
      <LuchtMap
        apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        setPopScheduleVis={setPopScheduleVis}
        popScheduleVis={popupScheduleVis}
        popJoinVis={popupJoinVis}
        setPopJoinVis={setPopJoinVis}
      />
      <CSSTransition
        in={popupScheduleVis||popupJoinVis}
        timeout={400}
        classNames="shadow"
        unmountOnExit
        appear={true}
      >
        <div className="shadow" onClick={(e) => {
          setPopScheduleVis(false)
          setPopJoinVis(false)
        }}></div>
      </CSSTransition>
      <AboutPage />
    </div>
  );
}

export default Lucht;
