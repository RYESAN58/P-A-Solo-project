import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api"


const Location = (props) => {
  const [result, setResult] = useState()
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: "AIzaSyD7k9nHu1R45An11JpWgDsLcQrB0c2rnlA"
  })
  let x = "AIzaSyD7k9nHu1R45An11JpWgDsLcQrB0c2rnlA"
  const {streetNumber, streetName, streetType, city, State } = useParams()
  useEffect(() => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${streetNumber}+${streetName}+${streetType},+${city},+${State}&key=${x}`)
      .then((response) => {
      const result = response.data[0]
      console.log(response.data.results[0].geometry.location)
      setResult(response.data.results[0].geometry.location)
    })
      .catch((err) => console.log(err.response));
  }, [])

  if (!isLoaded) {
    return(
      <p>Loading Map ...</p>
    )
  }
  
  return(
    <div style={{height:"1000px", width:'100%'}}>
      <GoogleMap center={result} zoom={16} mapContainerStyle={{width:'100%', height: '100%'}} >
        <Marker position={result}/>
      </GoogleMap>
    </div>
  )
}
export default Location