import React from "react";
import Navy from "./nav";

const ErrorPage = () => {
  
  
  return(
    <div>
      <Navy/>
      <div style={{ width: "40%", margin:"auto",height:"400px" , textAlign:"center", border: '5px red solid', marginTop:"10px", borderRadius:"20%", padding:"10%",}}>
        <h2 style={{fontWeight:'bolder'}}>Must login in to do that</h2>
      </div>
    </div>
  )
}

export default ErrorPage;