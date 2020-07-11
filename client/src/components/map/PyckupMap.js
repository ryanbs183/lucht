import React, {useState, useEffect} from 'react'
import { Map, GoogleApiWrapper, Marker, Polygon } from 'google-maps-react'
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

  const fetchPlaces = async (mapProps, map) => {
    await getUserPos()
    console.log(userLoc)
    const {google} = mapProps
    const service = new google.maps.places.PlacesService(map)
    const request = {
      location: userLoc,
      radius: 8000,
      openNow: true,
      name: ['soccer']
    }

    service.nearbySearch(request, (obj) => {
      getUserPos()
      console.log(obj)
    })
  }

  const toggleMenu = () => {
    setVis(!menuVis)
    console.log(menuVis)
  }

  const getGames = async (e) => {
    try{
      //return await axios.get(`http://localhost:5000/get/games/${e.target.id}`)
      axios
        .get(`http://localhost:5000/get/games`)
        .then((res) => {
          console.log(res.data.game)
        })
        toggleMenu();
    }catch(e){
      alert('Error')
      console.error(e)
    }
  }

  const getUserPos = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLoc({lat : position.coords.latitude, lng : position.coords.longitude})
    })
  }

  useEffect(() => {
      getUserPos()
    }, [])

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
            onClick={getGames}
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
