import ReactMapboxGl from 'react-map-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// const Map = ReactMapboxGl({
//   accessToken: 'pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ'
// });

async function MapComponent(props) {
    console.log(props)
  const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${props.location}.json?access_token=pk.eyJ1IjoibW9oZGlyZmFkIiwiYSI6ImNsZzNwaWFncTBocHozb28zb3YzcHpvejEifQ.CJcMCCKk4SKR6JBo2-JNnQ`;
  const response = await fetch(geocodeUrl);
  const data = await response.json();
  const coordinates = data.features[0].center;

  return (
    <ReactMapboxGl
      style="mapbox://styles/mapbox/streets-v11"
      center={coordinates}
      zoom={[13]}
      containerStyle={{
        height: '400px',
        width: '100%'
      }}
    />
  );
}

export default MapComponent;