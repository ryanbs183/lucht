import React, {useState, useEffect} from 'react'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import SideMenu from './SideMenu'


const PyckupMap = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%"};

  const defaultCenter = {
    lat: 41.3851, lng: 2.1734
  }
  return(
    <div class="map">
    <LoadScript
     googleMapsApiKey='AIzaSyAJwmnP7sseiJooVbrc6z6APY24zSTPK2w'>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
      />
   </LoadScript>
      <SideMenu />
    </div>
  )
}

export default PyckupMap
