import React ,{useEffect, useState}from 'react';
import {Box} from '@mui/material';
import ReactMapGL,{GeolocateControl, LngLat, Marker, NavigationControl} from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../../Store/features/UserLocationSlice';
import Geocoder from './Geocoder';
import { useRef } from 'react';
import ProgressComponent from './ProgressComponent';

function Location() {
  
  const Mapref = useRef();

  const dispatch = useDispatch();
  const {longitude,latitude,name} = useSelector(state => state.Location);
  console.log(longitude ,name)
  const [marker, setMarker] = useState({
    latitude: "",
    longitude: ""
  });

    const Handlemarker = (e) =>{

      const updatedMarker = {
        latitude: e.lngLat.lat,
        longitude:e.lngLat.lng
      };

      // setMarker(updatedMarker);

      var geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + updatedMarker.longitude + ',' + updatedMarker.latitude + '.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ';
    
      fetch(geocodeUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          console.log(data);
          // Get the city name from the geocoding data
          var cityName = data.features[1].place_name;
          console.log(cityName);
        });
 
    
      dispatch(
        setLocation({
          name:"user",
          longitude:updatedMarker.longitude,
          latitude:updatedMarker.latitude,
          
        })
      )
     
    }
    useEffect(()=> {
      if(!latitude && !longitude){
        fetch('https://ipapi.co/json')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          Mapref.current.flyTo({
            center: [data.longitude, data.latitude],
          });
          dispatch(
            setLocation({
              name:"user",
              longitude:data.longitude,
              latitude:data.latitude,
              
            })
          )
        })
      }
    },[]);
   
  return (
    <>
    <Box
    sx={{
        height:580,
        width:700,
        position:'relative',
        borderRadius: 1
    }}
    >
      <ReactMapGL
      ref={Mapref}
      mapboxAccessToken='pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ'
      initialViewState={{
        longitude:longitude,
        latitude:latitude,
        zoom:8
      }}

    mapStyle="mapbox://styles/mapbox/streets-v12"
        >
        <Marker
        latitude={marker.longitude}
        longitude={marker.latitude}
        offsetLeft={-20}
        offsetTop={-10}
        draggable
        onDragEnd={Handlemarker}


        />
        <NavigationControl position='bottom-right' />
        <GeolocateControl 
            position='top-left'
            trackUserLocation
           
            onGeolocate={(e)=>{
              console.log(e,"mohamed irfad")
            console.log(e.coords.latitude)
            dispatch(
              setLocation({
                name:"user",

                longitude:e.coords.longitude,
                latitude:e.coords.latitude,
              })
            )
            }}
        />

        <Geocoder/>
      </ReactMapGL>
    </Box>
   
    </>
  )
}

export default Location
