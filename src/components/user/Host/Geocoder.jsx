import MapBoxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { useControl } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import React from 'react'
import { setLocation } from '../../../Store/features/UserLocationSlice';

function Geocoder({handler}) {
    const dispatch = useDispatch();

    const ctrl = new MapBoxGeocoder({
        accessToken:"pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ",
        marker:true,
       
        collapsed:true,
    });
    useControl(()=> ctrl);
    ctrl.on('result' , (e)=>{
        console.log(e,"wrh3",e.result.place_name);
        const Place =e.result.place_name
        const coords = e.result.geometry.coordinates;
        handler(Place)
        dispatch(
            setLocation({
                name:"user",
                longitude:coords[0],
                latitude:coords[1],
                city:Place
            })
        )

    });

  return null;
}

export default Geocoder