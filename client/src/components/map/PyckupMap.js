import React, {useState, useEffect} from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import axios from 'axios'

import SideMenu from './SideMenu'
import mapStyle from './style/mapstyle'
const apiKey = 'AIzaSyAJwmnP7sseiJooVbrc6z6APY24zSTPK2w'

const PyckupMap = (props) => {
  const [userLoc, setUserLoc] = useState({lat: 0, lng: 0})
  const [menuVis, setVis] = useState(false)

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
      console.log(userLoc)
  }

  useEffect(() => {
      getUserPos()
    }, [])

   return (
     <>
       <div>
         <Map
           google={props.google}
           zoom={14}
           style={mapStyle}
           center={userLoc}
         >
         <Marker
            id="Field 1"
            onClick={getGames}
            name={'Kenyatta International Convention Centre'}
            position={userLoc}
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
