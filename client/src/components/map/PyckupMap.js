import React, {useState, useEffect} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import axios from 'axios'

import SideMenu from './SideMenu'

const getGames = async (e) => {
  try{
    //return await axios.get(`http://localhost:5000/get/games/${e.target.id}`)
    axios
      .get(`http://localhost:5000/get/games`)
      .then((res) => {
        console.log(res.data.game)
      })
    openMenu(res.data.game);
  }catch(e){
    alert('Error')
    console.error(e)
  }
}

const apiKey = 'AIzaSyAJwmnP7sseiJooVbrc6z6APY24zSTPK2w'
const mapStyles = {
  width: '100%',
  height: '100%'
}

const PyckupMap = (props) => {
   return (
     <Map
       google={props.google}
       zoom={14}
       style={mapStyles}
       initialCenter={{
        lat: -1.2884,
        lng: 36.8233
       }}
     >
     <Marker
        id="Field 1"
        onClick={getGames}
        name={'Kenyatta International Convention Centre'}
       />
     </Map>
   );
 }

export default GoogleApiWrapper({
  apiKey: apiKey
})(PyckupMap)
