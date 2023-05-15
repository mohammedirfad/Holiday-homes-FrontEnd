import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, NavigationControl } from 'react-map-gl';
import { useRef } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';


const Map = ({ location }) => {
  const [coordinates, setCoordinates] = useState(null);
  const Mapref = useRef();

  useEffect(() => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.features.length > 0) {
          setCoordinates([data.features[0].center[1], data.features[0].center[0]]);
        }
        // console.log(data);
        //   // Get the city name from the geocoding data
        //   var cityName = data.features[1].place_name;
        //   console.log(cityName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [location]);

  // const Mapbox = ReactMapboxGl({
  //   accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
  // });

  console.log(coordinates,"11111111111111111")

  return (


  
    <div  className='h-[500px] w-[100%] ' >
      {coordinates && (
        <ReactMapGL
        ref={Mapref}
        mapboxAccessToken='pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ'
          containerStyle={{
            height: '100%',
            width: '100%'
          }}
          initialViewState={{
            longitude:coordinates[1],
            latitude:coordinates[0],
            zoom:10
          }}
          // center={coordinates}
          // zoom={8}
          mapStyle="mapbox://styles/mapbox/streets-v12"
        >
          <Marker
          longitude={coordinates[1]}
          latitude={coordinates[0]}
          offsetLeft={-20}
        offsetTop={-10} >
          
          </Marker>
          <NavigationControl position='bottom-right' />
        </ReactMapGL>
      )}
    </div> 
  );
};

export default Map;

