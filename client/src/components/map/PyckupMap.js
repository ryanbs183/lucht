import React, {useState, useEffect} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import axios from 'axios'

import SideMenu from './SideMenu'
import mapStyle from './style/mapstyle'
const apiKey = 'AIzaSyAJwmnP7sseiJooVbrc6z6APY24zSTPK2w'
const userIcon = {
  url: 'https://img.icons8.com/material-rounded/24/000000/football.png'
}
const fieldIcon ={
  url:'https://img.icons8.com/material-rounded/24/000000/football2.png'
}

const PyckupMap = (props) => {
  const [userLoc, setUserLoc] = useState(null)
  const [menuVis, setVis] = useState(false)
  const getUserLoc = (options) => {
    console.log('Runnning getUserLoc')
    return new Promise((res, err) => {
      navigator.geolocation.getCurrentPosition(res, err, options);
    })
  }

  const fetchPlaces = (mapProps, map) => {
    console.log('Running fetchPlaces')
    getUserLoc()
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
          name: ['soccer']
        }
        const service = new google.maps.places.PlacesService(map)
        service.nearbySearch(request, (obj) => {
          console.log(obj)
        })
      })
      .catch((err) => {
        console.log("There was an error in fetchPlaces" + err)
      })
  }

  const toggleMenu = (e) => {
    getGames(e)
      .then((res) => {
        setVis(!menuVis)
        console.log(menuVis)
        console.log(res)
      })
  }

  const getGames = (e) => {
      return axios.get(`http://localhost:5000/get/games`)
  }

   return (
     <>
       <div>
         <Map
           google={props.google}
           zoom={13}
           style={{width: '80%', height: '93%'}}
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
            id="Field 1"
            onClick={toggleMenu}
            name={'Kenyatta International Convention Centre'}
            position={userLoc}
            icon={userIcon}
           />
         </Map>
       </div>
       <SideMenu
        vis={menuVis}
       />
    </>
   );
 }

export default GoogleApiWrapper({
  apiKey: apiKey
})(PyckupMap)
