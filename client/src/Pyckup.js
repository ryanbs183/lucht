import React from 'react'
import Home from './components/home/Home'
import About from './components/abt/About'
import GitHub from './components/git/GitHub'
import Header from './components/head/Header'
import PyckupMap from './components/map/PyckupMap'

const Pyckup = () => {
  return (
    <div className="Pyckup">
      <Header>
        <Home />
        <About />
        <GitHub />
      </Header>
      <PyckupMap />
    </div>
  );
}

export default Pyckup;
