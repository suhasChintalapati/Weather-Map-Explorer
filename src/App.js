import {  useEffect, useState } from 'react';
import ReactMapGL, {Marker, NavigationControl, useControl } from 'react-map-gl'
import { debounce } from 'lodash';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';

import { GeolocateControl } from 'react-map-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import Weather from './components/Weather';


const token=process.env.REACT_APP_MAP_ACCESS_TOKEN;

// console.log(token)
function App() {

  let [viewPort,setViewPort]=useState({
    latitude:28.7041,
    longitude:77.1025,
    zoom:8,
    maxZoom: 9,
    minZoom: 3.5
  });
  let [newPlace,setNewPlace]=useState(null);

  // given time to load
const debouncedOnMove=debounce((newViewPort)=>{
setViewPort(newViewPort);
},15)


// function to get users location
let getUserLocation=async()=>{
try{
const status=await navigator.permissions.query({name:'geolocation'})
if(status.state==='granted'|| status.state==='prompt'){
navigator.geolocation.getCurrentPosition(
  (position)=>{
    const {latitude,longitude}=position.coords;
    setViewPort({latitude,longitude});
    setNewPlace({
      lat:latitude,
      long:longitude
    });
  },
  (error)=>{
    console.log(error.message);
  }
)

}
// else if(status.state==='prompt'){
//   console.log('Location permission prompt');
// }
else if(status.state==='denied'){
  console.log('Location permission denied');
}
}
catch(err){
  console.error(err.message)
}
}


// to call only once while loading and to know users location
useEffect(() => {
  getUserLocation();
}, [])

// Handling of double click for marking
let handleClick = (e) => {
  console.log(e);
  if (e.lngLat) {
    let { lat, lng: long } = e.lngLat;
    setViewPort({
      latitude:lat,
      longitude:long
    });
    setNewPlace({
      lat,
      long
    });
  }
};

// search functionality
const GeocodingSearch=()=>{

  const ctrl= new MapboxGeocoder({
    accessToken:token,
    marker:false,
    collapsed:true,

  })
  useControl(()=>ctrl);
  ctrl.on('result',(e)=>{
    let coords=e.result.geometry.coordinates
    setViewPort({
      latitude:coords[1],
      longitude:coords[0]}
      )
      setNewPlace({
      lat:coords[1],
      long:coords[0]
      })
    // console.log(coords)
  })
}




// console.log(newPlace)
  return (
    <div className="App">
      <ReactMapGL
      {...viewPort}
      mapboxAccessToken={token}
      width="100%"
      height="100%"
      TransitionDuration='200'
      mapStyle="mapbox://styles/mapbox/streets-v11"
      // onViewportChange={(newViewPort)=>{
      //   setViewPort(newViewPort)
      // }}
      onMove={(newViewPort)=>{
        debouncedOnMove(newViewPort)
      }}
      onDblClick={handleClick}
      >

        <GeocodingSearch />

        
        <GeolocateControl 
        position='bottom-right'
        trackUserLocation
        onGeolocate={(e)=>{
        //  console.log(e);
         const {latitude,longitude}=e.coords;
         setViewPort({latitude,longitude});
         setNewPlace({
           lat:latitude,
           long:longitude
         });
        }}
        />
      
      <NavigationControl   position='bottom-right'/>
      
      {newPlace && 
       <Marker 
        latitude={newPlace?.lat}
        longitude={newPlace?.long}
        // offset={[-10,-20]}
        offset={[-viewPort.zoom * 5 / 2,-viewPort.zoom * 5/ 2]}
        offsetLeft={-viewPort.zoom * 5 / 2}
        offsetTop={-viewPort.zoom * 5/ 2}
      
        
        >

          <img src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/map-marker-512.png" alt='none' width={'50px'} height={'50px'}/>
        </Marker>
        } 

      </ReactMapGL>


      <Weather newPlace={newPlace}/>


    </div>

  );
}

export default App;
