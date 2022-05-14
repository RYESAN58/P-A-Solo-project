import React, { useState } from "react";
import Figure from 'react-bootstrap/Figure'
import Navy from "./nav";


const DetailedPost = (props) => {
  return (
    <div className="shadow">
      <Figure>
        {
          props.image ?
            <Figure.Image
              style={{
                objectFit: "cover",
                height: "2rem",
                width: "500px",
                maxWidth: "100%",
                height: "auto",
                border: "10px solid hsla(0,0%,100%,.5)"
              }}
              alt="171x180"
              src={require(`../../public/uploads/${props.image}`)}
            />:
          ""
        }
        <Figure.Caption style={{backgroundColor: "white", marginTop:"-7px"}}>
          {props.caption}
        </Figure.Caption>
        <Figure.Caption style={{backgroundColor: "white", marginTop:"-7px"}}>
          {
            props.FirstName.length > 1 ?
              `Posted by: ${props.FirstName}`:
              ''
          }
        </Figure.Caption>
      </Figure>
    </div>
  )
}


export default DetailedPost