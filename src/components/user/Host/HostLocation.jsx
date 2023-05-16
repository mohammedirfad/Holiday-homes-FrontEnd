import React ,{useEffect, useState}from 'react';
import {Box} from '@mui/material';
import ReactMapGL,{GeolocateControl, LngLat, Marker, NavigationControl} from 'react-map-gl';
// import 'mapbox-gl//dist/mapbox-gl.css';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '../../../Store/features/UserLocationSlice';
import Geocoder from './Geocoder';
import { useRef } from 'react';
import ProgressComponent from './ProgressComponent';
import { HOST_TITLE } from '../../../Constants/HostLinks';
import { hostLocation } from '../../../api/Services/HostsetUp';
import { setHoststep2 } from '../../../Store/features/HostSlicestep2';

function HostLocation() {
  const Mapref = useRef();
  const [city , setcity] =useState("")
  const dispatch = useDispatch();
  const host_id = useSelector(state => state.Hostslice1.host_id);

  const {longitude,latitude,name} = useSelector(state => state.Location);
 
  const token = useSelector(state => state.userAuth.token);
  

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
          console.log(cityName,"><><><><><><>");
          setcity(cityName);
          dispatch(
            setLocation({
              name:"user",
              longitude:updatedMarker.longitude,
              latitude:updatedMarker.latitude,
              city:cityName
              
            })
          )



        });
 
    
     
     
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
          setcity(data.city)
          dispatch(
            setLocation({
              name:"user",
              longitude:data.longitude,
              latitude:data.latitude,
              city:data.city
              
            })
          )
        })
      }
    },[]);

    const handleNext = async () => {

      
    
      try{

        const response = await hostLocation(city,host_id,token,)
        
      }
      catch(err){
        console.log(err,"err at loaction setup")
      }
  }

  return (
    <>
   <div className='w-full'>
    <div className='justify-center items-center flex flex-col my-12'>
    <div className='justify-center '>
    <h1 className='text-2xl md:text-3xl font-semibold font-sans '>
                Share some basics about your place
                </h1>
                <h1 className='text-md md:text-lg text-gray-500 mt-2'>You'll add more details later, such as bed types</h1>



                <Box
    sx={{
        height:580,
        width:500,
        position:'relative',
        borderRadius: 1,
        marginTop:5
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

        <Geocoder handler={setcity}/>
      </ReactMapGL>
    </Box>



    </div>

    </div>


    
   </div>
   <ProgressComponent link={HOST_TITLE} handler={handleNext}/>
   </>
  )
}

export default HostLocation;