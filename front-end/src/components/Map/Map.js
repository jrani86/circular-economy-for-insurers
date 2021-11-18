import React, { useState } from "react";
import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import InfoContent from "./InfoContent";



function Map(props) {
  const [activeMarker, setActiveMarker] = useState(null);
  const {  markers , onSelect ,onClickMarker} = props;

  const handleActiveMarker = (id) => {
    if (id === activeMarker) {
      return;
    }
    onClickMarker(id);
    setActiveMarker(id);
  };

  const handleOnLoad = (map) => {
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  

  return (
  (onSelect)?(
    <GoogleMap
      onLoad={handleOnLoad}
      onClick={() => setActiveMarker(null)}
      mapContainerStyle={{ width: "73vw", height: "90vh" }}
      
    >
      {markers.map(({ id, name, position ,distance,placeName,placeAddress, shop,icon }) => (
        
        <Marker
          key={id}
          position={position}
          onClick={() => handleActiveMarker(id)}
          icon = {icon}
        >
          {activeMarker === id ? (
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                <InfoContent name={name} id={id} shop={shop} placeName={placeName} distance={distance} onSelect={onSelect} placeAddress={placeAddress}></InfoContent>
            </InfoWindow>
          ) : null}
        </Marker>
      ))}
    </GoogleMap>):
     (<GoogleMap
     onLoad={handleOnLoad}
     onClick={() => setActiveMarker(null)}
     mapContainerStyle={{ width: "28vw", height: "61vh" }}
     center = {markers[0].position}
     defaultZoom={40}
     
   >
     
       
       <Marker
         key={markers[0].id}
         position={markers[0].position}
         onClick={() => handleActiveMarker(markers[0].id)}
         icon = {markers[0].icon}
       >
         {activeMarker === markers[0].id ? (
           <InfoWindow onCloseClick={() => setActiveMarker(null)}>
               <InfoContent name={markers[0].name} id={markers[0].id} shop={markers[0].shop} placeName={markers[0].placeName} distance={markers[0].distance}  placeAddress={markers[0].placeAddress}></InfoContent>
           </InfoWindow>
         ) : null}
       </Marker>
     
   </GoogleMap>)

  );
}

export default Map;
