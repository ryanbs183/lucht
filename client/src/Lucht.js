import React from 'react'
import Home from './components/home/Home'
import About from './components/abt/About'
import GitHub from './components/git/GitHub'
import Header from './components/head/Header'
import LuchtMap from './components/map/LuchtMap'

const Lucht = () => {
  return (
    <div className="Pyckup">
      <Header>
        <Home />
        <About />
        <GitHub />
      </Header>
      <LuchtMap />
    </div>
  );
}

export default Lucht;
