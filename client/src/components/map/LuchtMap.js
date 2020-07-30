import React, {useState} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import { CSSTransition } from 'react-transition-group'
import axios from 'axios'
import https from 'https'

import SideMenu from './SideMenu'
import ScheduleMenu from './menus/ScheduleMenu'
import JoinMenu from './menus/JoinMenu'
import mapStyle from './style/mapstyle'

import apiKeys from './.APIKeys/api_keys'

const agent = new https.Agent({
  rejectUnauthorized: false
})

const LuchtMap = (props) => {
  const userIcon = {
    url: "https://img.icons8.com/color/48/000000/green-lantern.png",
    scaledSize: new props.google.maps.Size(25,25)
  }
  const fieldIcon = {
    url: "https://img.icons8.com/ios-filled/50/000000/multicultural-people.png",
    scaledSize: new props.google.maps.Size(30,30)
  }
  const [currFieldLoc, setCurrFieldLoc] = useState(null)
  const [currFieldID, setCurrFieldID] = useState(null)
  const [userLoc, setUserLoc] = useState(null)  //stores user geolocation
  const [menuVis, setVis] = useState(false)     //stores as to whether the slideout menu should be visible
  const [fields, setFields] = useState(null)    //stores the field map data
  const [games, setGames] = useState(null)      //stores game data

  //returns a Promise to get the user's geolocation
  const getUserLoc = (options) => {
    console.log('Runnning getUserLoc')
    return new Promise((res, err) => {
      navigator.geolocation.getCurrentPosition(res, err, options);
    })
  }
  //returns a Promise to send an AJAX request to the Express server to GET the relevant game data
  const getGames = (e) => {
    setCurrFieldLoc({lat: e.position.lat, lng: e.position.lng})
    setCurrFieldID(e.id)
    return axios.get(`http://172.31.23.60:5000/get/games/${e.id}`)
  }
  const postGame = (e, gameData) => {
    return axios.post(`http://172.31.23.60:5000/post/game`, gameData)
  }
  const joinGame = (e, joinData) => {
    return axios.post('http://172.31.23.60:5000/join/game', joinData)
  }
  //sets the menuVis to true and sorts the game data to only show games at each field
  const openMenu = (e) => {
    if(menuVis === true){
      //console.log('Wipe Menu')
      setVis(false)
      setTimeout(() => {
        setVis(true)
      }, 500)
    }
    else if(menuVis === false){
      //console.log('No wipe')
      setVis(true)
    }
    getGames(e)
     .then((res) => {
       console.log(res.data)
       if(res.data[0]){
        setGames(res.data[0])
       }
     })
  }
  //gets the fields near the user and sets the fields variable to that data
  const fetchPlaces = (mapProps, map) => {
    console.log('Running fetchPlaces')
    getUserLoc({enableHighAccuracy: true, timeout: 15000})
      .then((res) => {
        console.log('Setting userLoc')
        let loc = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
        setUserLoc(loc)
        console.log('Getting nearby games')
        const {google} = mapProps
        const request = {
          location: loc,
          radius: 8000,
          openNow: true,
          name: ['basketball', 'soccer']
        }
        const service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, (obj) => {
          if(obj.length === 0){
            console.log('No fields')
          }
          else {
            setFields(obj.map((field) => {
              return(
              <Marker
              id={field.id}
              onClick={openMenu}
              position={{lat: field.geometry.location.lat(), lng: field.geometry.location.lng()}}
              icon={fieldIcon}
              />)}
              ))
          }
        })
      })
      .catch((err) => {
        
        console.log(err)
      })
  }

   return (
     <div style={{height: '91vh', width: '100%'}}>
       <div>
         <Map
           google={props.google}
           zoom={12}
           style={{width: '100%', height: '92.5%', zIndex: 0}}
           styles={mapStyle}
           center={userLoc}
           onReady={fetchPlaces}
           scrollwheel={false}
           draggable={false}
           keyboardShortcuts={false}
           disableDoubleClickZoom={true}
           zoomControl={false}
           mapTypeControl={false}
           scaleControl={false}
           streetViewControl={false}
           panControl={false}
           rotateControl={false}
           fullscreenControl={false}
         >
          <Marker
            id="user"
//            onClick={(e) => {setVis(true)}}   // uncomment to test side menu CSS without geolocation
            name={'User'}
            position={userLoc}
            icon={userIcon}
           />
           {fields}
         </Map>
         <CSSTransition
           in={props.popScheduleVis}
           timeout={400}
           classNames="popup-menu"
           unmountOnExit
           appear={true}
         >
           <ScheduleMenu
            postGame={postGame}
            loc={currFieldLoc}
            fieldID={currFieldID}
            setPopVis={props.setPopScheduleVis}
           />
         </CSSTransition>
         <CSSTransition
           in={props.popJoinVis}
           timeout={400}
           classNames="popup-menu"
           unmountOnExit
           appear={true}
         >
           <JoinMenu
            joinGame={joinGame}
            field={games}
            setPopVis={props.setPopJoinVis}
           />
         </CSSTransition>
       </div>
       <CSSTransition
         in={menuVis}
         timeout={400}
         classNames="side-menu"
         unmountOnExit
         appear={true}
       >
       <SideMenu
        vis={menuVis}>
        <div className='close-button' onClick={(e)=>{setVis(false)}}><b>↪</b></div>
        <div className="menu-button" role="button" onClick={(e) => {props.setPopScheduleVis(true)}}><b>Schedule Game</b></div>
        <div className="menu-button" role="button" onClick={(e) => {props.setPopJoinVis(true)}}><b>Join Game</b></div>
       </SideMenu>
       </CSSTransition>
    </div>
   )
 }

export default GoogleApiWrapper({
  apiKey: apiKeys.google
})(LuchtMap)
